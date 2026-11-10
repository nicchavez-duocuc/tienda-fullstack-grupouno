package com.fullstack.productos.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.fullstack.productos.Repository.ProductoRepository;
import com.fullstack.productos.Repository.ResenaRepository;
import com.fullstack.productos.dto.ResenaRespuesta;
import com.fullstack.productos.model.Resena;
import com.fullstack.productos.model.Usuario;

// Reseñas: escritas por usuarios sobre productos. Formato de fecha y nombres
// iguales a como los mostraba la tienda antes (dd/mm/yyyy, apodo del autor)
@Service
public class ResenaService {

    private static final DateTimeFormatter FECHA_CL = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    @Autowired
    private ResenaRepository resenaRepository;

    @Autowired
    private ProductoRepository productoRepository;

    // Todas las reseñas, o filtradas por producto (codigo) si llega ?producto=P001
    public List<ResenaRespuesta> listar(String productoCodigo) {
        List<Resena> resenas = (productoCodigo == null || productoCodigo.isBlank())
                ? resenaRepository.listarConAutorYProducto()
                : resenaRepository.listarPorProductoConAutor(productoCodigo);
        return resenas.stream().map(this::aRespuesta).toList();
    }

    // Escribir una reseña (solo el usuario del token; 1 reseña por producto)
    public ResenaRespuesta escribir(Usuario usuario, String codigoProducto, Integer puntuacion, String comentario) {
        if (resenaRepository.existsByUsuarioIdAndProductoCodigo(usuario.getId(), codigoProducto)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ya escribiste una reseña de este producto.");
        }

        Resena resena = new Resena();
        resena.setUsuario(usuario);
        resena.setProducto(productoRepository.findByCodigoConCategoria(codigoProducto)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "No existe el producto " + codigoProducto)));
        resena.setPuntuacion(puntuacion);
        resena.setComentario(comentario.trim());
        resena.setFecha(LocalDate.now());

        return aRespuesta(resenaRepository.save(resena));
    }

    // Borrar una reseña: solo su autor o el ADMIN
    public void eliminar(Usuario usuario, Long id) {
        Resena resena = resenaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No existe la reseña con id " + id));

        boolean esAdmin = "ADMIN".equalsIgnoreCase(usuario.getRol());
        boolean esAutor = resena.getUsuario().getId().equals(usuario.getId());
        if (!esAdmin && !esAutor) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Solo puedes borrar tus propias reseñas.");
        }

        resenaRepository.delete(resena);
    }

    // Misma forma de reseña que dibuja la tienda: producto (nombre), nombre (autor)
    private ResenaRespuesta aRespuesta(Resena resena) {
        return new ResenaRespuesta(
                resena.getId(),
                resena.getProducto().getNombre(),
                resena.getUsuario().getApodo() != null && !resena.getUsuario().getApodo().isBlank()
                        ? resena.getUsuario().getApodo() : resena.getUsuario().getNombre(),
                resena.getPuntuacion(),
                resena.getComentario(),
                resena.getFecha() == null ? "" : resena.getFecha().format(FECHA_CL));
    }
}
