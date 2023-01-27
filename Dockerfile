FROM amazoncorretto:17

COPY e-commerce*.jar e-commerce.jar

ENTRYPOINT ["java", "-jar", "/e-commerce.jar"]