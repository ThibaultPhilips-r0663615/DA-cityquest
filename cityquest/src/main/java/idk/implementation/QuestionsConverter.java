package idk.implementation;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import idk.model.Coordinates;
import idk.model.Question;

import javax.persistence.AttributeConverter;
import java.io.IOException;
import java.util.List;

public class QuestionsConverter implements AttributeConverter<List<Question>, String> {

	private final static ObjectMapper objectMapper = new ObjectMapper();

	@Override
	public String convertToDatabaseColumn(List<Question> attribute) {
		try {
			return objectMapper.writeValueAsString(attribute);
		} catch (JsonProcessingException e) {
			throw new RuntimeException("Could not convert question to json", e);
		}
	}

	@Override
	public List<Question> convertToEntityAttribute(String dbData) {
		try {
			JavaType type = objectMapper.getTypeFactory().constructCollectionType(List.class, Question.class);
			return objectMapper.readValue(dbData, type);
		} catch (IOException e) {
			throw new RuntimeException("Could not read question from json", e);
		}
	}
}
