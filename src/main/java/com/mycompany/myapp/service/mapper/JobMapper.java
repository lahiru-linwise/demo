package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.JobDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Job and its DTO JobDTO.
 */
@Mapper(componentModel = "spring", uses = {EmployeeMapper.class, TaskMapper.class, })
public interface JobMapper extends EntityMapper <JobDTO, Job> {
    @Mapping(source = "employee.id", target = "employeeId")
    JobDTO toDto(Job job); 
    @Mapping(source = "employeeId", target = "employee")
    Job toEntity(JobDTO jobDTO); 
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */
     
    default Job fromId(Long id) {
        if (id == null) {
            return null;
        }
        Job job = new Job();
        job.setId(id);
        return job;
    }
}
