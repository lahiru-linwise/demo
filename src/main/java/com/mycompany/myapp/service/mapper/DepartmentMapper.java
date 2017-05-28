package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.DepartmentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Department and its DTO DepartmentDTO.
 */
@Mapper(componentModel = "spring", uses = {LocationMapper.class, })
public interface DepartmentMapper extends EntityMapper <DepartmentDTO, Department> {
    @Mapping(source = "location.id", target = "locationId")
    DepartmentDTO toDto(Department department); 
    @Mapping(source = "locationId", target = "location")
    @Mapping(target = "employees", ignore = true)
    Department toEntity(DepartmentDTO departmentDTO); 
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */
     
    default Department fromId(Long id) {
        if (id == null) {
            return null;
        }
        Department department = new Department();
        department.setId(id);
        return department;
    }
}
