package com.revature.services;

import com.revature.models.User;
import com.revature.repositories.UserRepository;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
    /*
    the 3 A's of unit testing:
     - Arrange - set up the parameters for valid testing
     - Act - perform the test
     - Assert - verify the outcome of the action

     @Test
     @BeforeEach
     @AfterEach
     @AfterAll
     @BeforeAll
     */

    // what is the system I am testing?
    public UserService sut;

    // what needs to be mocked to test this system?
    // access modifiers?
    @Mock
    private User mockUser;

    private String email = "mock@email.com";

    private String password = "password";

    @Mock
    UserRepository mockUserRepository;

    // set up the mocked user repository
    @BeforeAll
    public static void beforeAll() {
        System.out.println("Starting tests...");
    }

    @AfterAll
    public static void afterAll() {
        System.out.println("Tests complete.");
    }

    @Test
    public void testFindByCredentials() {
        sut = new UserService(mockUserRepository);
        Mockito.when(mockUserRepository.findByEmailAndPassword(email, password)).thenReturn(Optional.of(mockUser));
        Optional<User> user = sut.findByCredentials(email, password);

        Assertions.assertEquals(Optional.of(mockUser), user);
    }







}
