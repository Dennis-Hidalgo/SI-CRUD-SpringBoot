package com.example.conexionBD.DAO;

import com.example.conexionBD.Modelo.Alumnos;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Repository
public class AlumnosDAOImp implements AlumnosDAO {

    @PersistenceContext
    EntityManager entityManager;
    @Override
    public List<Alumnos> listar() {
        String query = "FROM Alumnos";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void delete(int id) {
        Alumnos asignatura = entityManager.find(Alumnos.class,id);
        entityManager.remove(asignatura);
    }

    @Override
    public void add(Alumnos asignatura) {
        entityManager.merge(asignatura);
    }

    @Override
    public void update(int id, Alumnos alumno) {
        Alumnos alumnoExistente = entityManager.find(Alumnos.class, id);

        if (alumnoExistente != null) {
            // Actualizar los atributos del alumno existente con los valores del alumno modificado
            alumnoExistente.setNombre(alumno.getNombre());
            alumnoExistente.setNota(alumno.getNota());
            alumnoExistente.setPeriodo(alumno.getPeriodo());
            // Agrega el resto de atributos que deseas actualizar

            entityManager.merge(alumnoExistente);
        }
    }
}
