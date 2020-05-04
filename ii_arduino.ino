#include <Adafruit_NeoPixel.h>

#include "Adafruit_seesaw.h"

int ledPin = 2;
int numLED = 20;

Adafruit_NeoPixel leds(numLED, ledPin, NEO_GRB + NEO_KHZ800);

Adafruit_seesaw ss;
const int sensorIn = A0;

void setup() {
  leds.begin();
  leds.show();
  Serial.begin(9600);
  //ss.begin(0x36);
}

void loop() {
  
  Serial.print(analogRead(A0));
  Serial.print(", ");
  Serial.println(analogRead(A1));

  
  delay(100);

  leds.fill(leds.Color(random(255),random(255),random(255)));
  leds.show();
  delay(1000);
}
