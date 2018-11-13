package idk.implementation;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import idk.model.Coordinates;

import javax.persistence.AttributeConverter;
import java.io.IOException;

public class CoordinatesConverter implements AttributeConverter<Coordinates, String> {

	private final static ObjectMapper objectMapper = new ObjectMapper();

	@Override
	public String convertToDatabaseColumn(Coordinates attribute) {
		try {
			return objectMapper.writeValueAsString(attribute);
		} catch (JsonProcessingException e) {
			throw new RuntimeException("Could not convert coordinates to json", e);
		}
	}

	@Override
	public Coordinates convertToEntityAttribute(String dbData) {
		try {
			return objectMapper.readValue(dbData, Coordinates.class);
		} catch (IOException e) {
			throw new RuntimeException("Could not read coordinates from json", e);
		}
	}
}
