package com.phil;

import com.fasterxml.jackson.databind.MappingIterator;
import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;
import com.phil.model.Agent;
import com.phil.repository.AgentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;

import java.util.List;


@SpringBootApplication
public class DoubleAgentsApplication {

	public static void main(String[] args) {
		SpringApplication.run(DoubleAgentsApplication.class, args);
	}


	@Bean
	public CommandLineRunner go(AgentRepository agentRepository) {
		return (args) -> {

			CsvMapper mapper = new CsvMapper();
			CsvSchema schema = mapper.schemaFor(Agent.class).sortedBy("name", "latitude", "longitude", "age", "sex");
			MappingIterator<Agent> agentIterator = mapper.readerFor(Agent.class).with(schema).readValues(new ClassPathResource("cc-maps-data-set.csv").getFile());
			List<Agent> agents = agentIterator.readAll();
			agents.forEach(agent -> agentRepository.save(agent));

		};

	}
}
