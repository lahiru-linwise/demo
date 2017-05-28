package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.JobHistoryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity JobHistory and its DTO JobHistoryDTO.
 */
@Mapper(componentModel = "spring", uses = {JobMapper.class, DepartmentMapper.class, EmployeeMapper.class, })
public interface JobHistoryMapper extends EntityMapper <JobHistoryDTO, JobHistory> {
    @Mapping(source = "job.id", target = "jobId")
    @Mapping(source = "department.id", target = "departmentId")
    @Mapping(source = "employee.id", target = "employeeId")
    JobHistoryDTO toDto(JobHistory jobHistory); 
    @Mapping(source = "jobId", target = "job")
    @Mapping(source = "departmentId", target = "department")
    @Mapping(source = "employeeId", target = "employee")
    JobHistory toEntity(JobHistoryDTO jobHistoryDTO); 
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */
     
    default JobHistory fromId(Long id) {
        if (id == null) {
            return null;
        }
        JobHistory jobHistory = new JobHistory();
        jobHistory.setId(id);
        return jobHistory;
    }
}
