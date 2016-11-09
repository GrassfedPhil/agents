package com.phil.repository;

import com.phil.model.Agent;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AgentRepositoryTest {

    @Autowired
    AgentRepository agentRepository;

    @Test
    public void allAgentsAreLoaded() {
        long count = agentRepository.count();
        assertThat(count).isEqualTo(150);
    }

    @Test
    public void findBySexDoesJustThat(){
        List<Agent> men = agentRepository.findBySex("Male");
        assertThat(men).hasSize(83);

        List<Agent> women = agentRepository.findBySex("Female");
        assertThat(women).hasSize(67);
    }
}