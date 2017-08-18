# GUESS THE PLACE – Google Maps API game

Gra zbudowana w oparciu o Google Maps API.

## Cel gry:

  Zadaniem gracza jest wytypowanie nazwy miejsca(lub umieszczenie pina na mapie?) losowo wygenerowanego przez grę.

  Im bardziej precyzyjny jest gracz tym więcej punktów otrzyma:
POZIOMY PRECYZJI:
5. Kontynent
4. Państwo
3. Miasto
2. Ulica
1. Dokładny pin na mapie


## Zasady:
1. Pojedyncza gra składa się z 5 rund.
2. W każdej rundzie gra losuje StreetView i generuje go graczowi. (tylko w miastach – bez losowych ulic, pól itp. między miejscowościami).
3. Bazowy score dla każdej rundy 1000pkt – od niego będą odliczane bonusy.
4. Za podanie każdego z w/w punktów mnożnik zwiększa się o 1, trafienie pina w odległości < 50km daje x2 (Bazowy = 1, Max mnożnik x7).
5. Gracz ma 10 strzałów łącznie – dla wszystkich mnożników.
6. Po podaniu np. poprawnego kontynentu odblokowuje się możliwość podania państwa.
7. Nawet jeżeli gracz zużył 10 strzałów a nie dotarł do poziomu pina – ma ostatni dodatkowy strzał na postawienie pina i zakończenie rundy.
8. Gracz może zużyć jeden strzał, żeby pominąć typowanie (odkrywa się nazwa ale gracz traci ten mnożnik) i przejść do kolejnego poziomu precyzji.
9. Po zaznaczeniu pinem miejsca, gracz może nacisnąć „This is the place!” – powoduje zakończenie rundy, liczenie jej wyniku i przejście do kolejnej po 3 sekundach.

## Liczenie punktów:

Po zatwierdzeniu wyboru przez gracza następuje liczenie punktów według wzoru:

R = (1000 – km) * (1 + m)

### Gdzie:
R – result;
km – błąd gracza w dokładności zaznaczenia pina;
m – łączna liczba dobrych typów.
