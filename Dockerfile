FROM amazoncorretto:17

COPY target/e-commerce*.jar e-commerce.jar

ENTRYPOINT ["java", "-jar", "/e-commerce.jar"]