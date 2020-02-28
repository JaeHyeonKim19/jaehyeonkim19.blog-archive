---
title: '3 way handshake, 4 way handshake'
date: 2020-01-10 08:26:28 -0400
paht: 'network/202001103way_handshake_4way_handshake'
---

출처 링크입니다.
[링크](https://asfirstalways.tistory.com/356)

손으로 따라 타이핑하면서 공부.

![3-way-handshake -&-4-way-handshake](http://mblogthumb2.phinf.naver.net/MjAxNzA0MThfMTA0/MDAxNDkyNTA2NzEyNzUy.1cxOSe3iprkos7F0tBgrwzCZ_xLpT8HlMnDVIo_ziTwg.kILtTcOE1dGISZlQI_7uiTcbQ4kU0CWngPkEQpaf6UEg.GIF.bloodsoda/Image2001.gif?type=w800)\

- 연결 성립

  1.  클라이언트가 먼저 SYN(a)패킷을 보낸다. (이 때 클라이언트는 syn sent 상태)
  2.  SYN(a)패킷을 받은 서버는 잘 수신했다는 의미로 수신받은 sequence number에 1을 더한 값(a+1)을 담은 ACK패킷과 서버의 응답을 잘 수신했는지 확인받기위해 SYN(b)패킷을 보낸다.(이 때 서버는 syn received 상태)
  3.  ACK패킷을 통해 서버가 요청을 잘 수신한 것을 확인한 클라이언트는 서버의 응답을 잘 수신했다는 뜻으로 ACK(b+1)패킷을 보낸다.(이 떄 클라이언트는 established 상태)
  4.  마지막으로 ACK(b+1)패킷을 통해 응답을 잘 받은것을 확인한 서버 또한 established 상태가 되며 3 way handshake가 종료된다.

- 연결 해제

  1. 클라이언트가 통신을 끝내겠다는 뜻으로 FIN플래그를 전달한다.
  2. FIN플래그를 수신한 서버는 FIN플래그를 수신했다는 뜻으로 ACK를 전달한다. 그리고 서버는 아직 전달받지 못한 요청을 수신하기위해 잠시 time out 상태가 된다.
  3. 요청을 마저 수신한 후 서버는 통신을 이제 끝내겠다는 뜻으로 FIN플래그를 클라이언트에게 전송한다.
  4. FIN플래그를 수신한 클라이언트는 수신했다는 뜻의 ACK를 전달하고 아직 받지못한 데이터가 있는것을 대비해 일정 시간 동안 세션을 남겨놓고 잉여 패킷을 기다리는 time wait상태가 된다.
  5. ACK를 수신한 서버는 소켓연결을 close한다.

- SYN Packet? ACK Packet?
  두 용어는 다음의 약자다.

  > SYN : Syncronize sequence packet<br>ACK : Acknowledge

  TCP 헤더에는 code bit이라는 이름으로 6bit가 할당되어있다. 이 6bit는 urg-ack-psh-rst-syn-fin이며 해당 비트가 1이면 해당 내용을 담은 패킷이라는 뜻이 된다.

- 왜 두 종류의 패킷을 써야하는가?
  요청과 응답 두 가지 상태를 표현해야하기 때문이다.

- 왜 3 way인가? 2 way로하면 안되나?
  무전기 대화를 예로들어 보자. 두 사람이 서로 대화가 잘 되는지 확인하려면 A가먼저 B에게 "잘들리니?"라고 물으면 B는 "잘 들려! 너는 어때?"이렇게 물어야한다. A 또한 B의 말이 잘 들리는지 확인해야하기 때문이다. 잘 들린다면 A는 "잘 들려!"라고 대답을 할 것이다. 이와 같이 3번의 통신을 주고받아야 양방향성이 확인된다.

- 왜 랜덤한 sequence number를 사용하는가?
  ??? 아직 잘 모르겠음. 한글로 번역된 내용들은 뭔가 납득이 안되고 영어로 검색해봐도 많은 자료가 나오지 않음. 그나마 타당한 글은 초기 시퀀스 넘버를 정할 때 정해진 사항이 없다는 글이었다. 하지만 그 글이 사실에 기반한 글인지 확인할 방법이 없어 아직 자료를 더 찾는 중.
