package com.phil.repository;

import com.phil.model.Agent;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AgentRepository extends CrudRepository<Agent, String> {

    List<Agent> findBySex(String sex);

    List<Agent> findBySexAndAgeLessThan(String female, Integer ageToFilterBy);
}
