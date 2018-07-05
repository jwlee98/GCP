package com.example.demo;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Random;

@RestController
@Slf4j
public class WorkController {

  @Autowired
  RestTemplate restTemplate;

  public void meeting() {
    String result = restTemplate.getForObject("http://localhost:80/meet", String.class);
    log.info(result);
  }

  @GetMapping("/call")
  public String work() {
    // What is work? Meetings!
    // When you hit this URL, it'll call meetings() 5 times.
    // Each time will have a random delay.
    log.info("starting to work");
    for (int i = 0; i < 5; i++) {
      this.meeting();
    }
    log.info("finished!");
    return "finished work!";
  }
}

