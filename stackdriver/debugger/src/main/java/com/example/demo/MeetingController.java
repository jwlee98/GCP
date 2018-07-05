package com.example.demo;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;

@RestController
@Slf4j
public class MeetingController {
  Random r = new Random();

  @GetMapping("/meet")
  public String meeting() {
    try {
      log.info("meeting...");
      for (int i=0; i<10000 ; ++i) { }
      log.info("end for loop 10000.");
      Thread.sleep(r.nextInt(500 - 20 + 1) + 20);
    } catch (InterruptedException e) {
    }
    return "finished meeting";
  }
}
