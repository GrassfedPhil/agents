package com.phil.controllers;

import com.phil.model.Agent;
import com.phil.repository.AgentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class AgentController {

    @Autowired
    AgentRepository agentRepository;

    @RequestMapping("/agents")
    public List<Agent> getAgents(@RequestParam String gender, @RequestParam(required = false) Integer ageToFilterBy) {
        List<Agent> agents = new ArrayList<>();
        Iterable<Agent> agentIterable;
        if (ageToFilterBy != null) {
            agentIterable = agentRepository.findBySexAndAgeLessThan(gender, ++ageToFilterBy);
        } else {
            agentIterable = agentRepository.findBySex(gender);
        }
        agentIterable.forEach(agents::add);
        return agents;
    }
}
