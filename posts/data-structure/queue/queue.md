---
title: '[자료구조] 큐(Queue)'
date: 2020-11-01 09:00:00 +0900
path: 'data-structure/20201101Queque'
---

### 큐

큐는 데이터를 일시적으로 쌓아 두기 위한 자료구조로 먼저 넣은 데이터가 먼저 나오는 FIFO (First In First Out)구조로 되어 있다. 은행 창구에서 차례를 기다리는 대기열이나 마트에서 계산을 기다리는 대기열 등을 예로 들 수 있다. 컴퓨터에서는 프린터의 출력 처리, 윈도 시스템의 메시지 처리기, 프로세스 관리 등 데이터가 입력된 시간 순서대로 처리해야 할 필요가 있는 상황에 이용된다.

큐는 선형, 환형, 연결 리스트로 구현될 수 있다. 선형으로 구현하게 될 경우 deque(제일 앞의 자료를 뽑아내는 것) 할 때 마다 배열에 들어있는 데이터들을 앞으로 옮겨주는 작업을 해야하기 때문에 비효율적이다.(deque를 할 때 마다 O(n) 복잡도) 이를 극복하기 위해서는 환형구조로 구현하면 된다. 환형의 경우 배열의 마지막 인덱스까지 데이터가 들어 있어도 데이터를 추가했을 때 첫 번째 인덱스로 돌아가 데이터를 추가하기 때문이다. 하지만 환형구조도 첫 번쩨 인덱스에 데이터가 존재하면 오버플로우가 발생한다는 단점이 있는데, 이를 극복하려면 리스트 구조로 구현하면 된다. 리스트로 구현하게되면 큐의 길이를 쉽게 조절할 수 있어 오버플로우가 발생하지 않는다.

### 큐 구현하기

위에서 설명한 바와 같이 선형, 환형, 리스트 세 가지 형태로 구현할 수 있다. 여기서는 환형으로 구현하는 연습을 해보자. 생성자와 데이터를 추가하는 enque, 데이터를 제거하고 그 값을 반환하는 deque를 구현해보자.

```java
public class MyQueue<E> {
	private int max;  // 큐의 용량
	private int front;  // 첫 번째 요소 커서
	private int rear;  // 마지막 요소 커서
	private int num;  // 현재 데이터 수
	private E[] que;  // 큐 본체

	// 생성자
	public MyQueue(int capacity) {
		num = 0;
		front = 0;
		rear = 0;
		max = capacity;
		try{
			que = new E[max];
		}catch (OutOfMemoryError e) {
			max = 0;
		}
	}

	public E enque(int x) throws BufferOverflowException {
		if (num >= max)
			throw new BufferOverflowException();
		que[rear++] = x;
		num++;
		if (rear == max)
			rear = 0;
		return x;
	}

	public E deque() throws BufferUnderflowException {
		if (num <= 0)
			throw new BufferUnderflowException
		int x = que[front++];
		num--;
		if (front == max)
			front = 0;
		return x;
	}
}
```

### 참고

- [큐 - 위키 백과](https://ko.wikipedia.org/wiki/%ED%81%90_(%EC%9E%90%EB%A3%8C_%EA%B5%AC%EC%A1%B0))
- [자료구조와 함께 배우는 알고리즘 입문 (자바편)](http://www.yes24.com/Product/Goods/60547893)