
FROM amazoncorretto:17

COPY e-commerce-backend-main/target/e-commerce*.jar e-commerce.jar

ENTRYPOINT ["java", "-jar", "/e-commerce.jar"]

<<<<<<< HEAD




=======
EXPOSE 7777
>>>>>>> c79d70866096159ac2bdbc45ce4adfc1f6262e07
