package com.phil.controllers;

import com.phil.model.Agent;
import com.phil.repository.AgentRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@SpringBootTest
@RunWith(MockitoJUnitRunner.class)
public class AgentControllerTest {

    @InjectMocks
    AgentController agentController;

    @Mock
    AgentRepository agentRepository;

    @Test
    public void getAgents() throws Exception {
        Agent michelle = new Agent("Michelle", "someLat", "someLong", 35, "Female");
        when(agentRepository.findBySex("Female")).thenReturn(Arrays.asList(michelle));

        List<Agent> womenAgents = agentController.getAgents("Female");

        assertThat(womenAgents).contains(michelle);
    }

}