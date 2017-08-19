# GUESS THE PLACE – Google Maps API game

Gra zbudowana w oparciu o Google Maps API.

## Cel gry:

Zadaniem gracza jest wytypowanie nazwy miejsca losowo wygenerowanego przez grę, a następnie umieszczenie jak najdokładniejszego pina na mapie.
Im bardziej precyzyjny jest gracz tym więcej punktów otrzyma:  

## POZIOMY PRECYZJI:  
* Kontynent  
* Państwo  
* Miasto  
* Ulica  
* Pin na mapie w odległości mniejszej niż 50m od punktu startu.


## Zasady:
1. Pojedyncza gra składa się z 5 rund.
2. W każdej rundzie gra losuje StreetView i generuje go graczowi. (tylko w miastach – bez losowych ulic, pól itp. między miejscowościami).
3. Bazowy score dla każdej rundy 1000pkt – od niego będą odliczane bonusy.
4. Za podanie każdego z w/w poziomów precyzji mnożnik zwiększa się o 1, trafienie pina w odległości < 50m daje x2 (Bazowy = 1, Max mnożnik x7).
5. Gracz ma 10 strzałów łącznie – dla wszystkich mnożników i pinów.
6. Po podaniu poprawnego kontynentu odblokowuje się możliwość podania państwa(itd.).
7. Nawet jeżeli gracz zużył 10 strzałów, a nie dotarł do poziomu pina – ma ostatni dodatkowy strzał na postawienie pina i zakończenie rundy.
8. Gracz może zużyć jeden strzał, żeby pominąć typowanie i przejść do kolejnego poziomu precyzji(odkrywa się nazwa ale gracz traci ten mnożnik).
9. Po zaznaczeniu pinem miejsca, gracz może nacisnąć „This is the place!” – powoduje to zakończenie rundy, liczenie jej wyniku i wyświetlenie ekranu podsumowującego rundę.
10. Gracz może wtedy nacisnąć przycisk Next round, aby przejść do kolejnej rundy.

## Liczenie punktów:

Po zatwierdzeniu wyboru przez gracza następuje liczenie punktów według wzoru:

R = (1000 – error) * (1 + multiplier)

### Gdzie:
R – result;  
error – błąd gracza w dokładności zaznaczenia pina(w metrach);  
multiplier – łączna liczba dobrych typów.  
