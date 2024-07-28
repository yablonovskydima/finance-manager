FROM maven:3.9.6-amazoncorretto-17 AS builder

COPY pom.xml /app/pom.xml
COPY src /app/src

WORKDIR /app

RUN mvn clean package

FROM amazoncorretto:17
COPY --from=builder /app/target/*.jar /app/app.jar
EXPOSE 8083
ENTRYPOINT ["java", "-jar", "/app/app.jar"]