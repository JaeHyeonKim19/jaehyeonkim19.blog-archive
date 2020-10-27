---
title: '[자료구조] 덱(Deque)'
date: 2020-10-23 09:00:00 +0900
path: 'data-structure/20201023deque'
---

### 덱

덱(Deque)은 양쪽 끝에서 삽입과 삭제가 모두 가능한 자료구조이다. 두 개의 포인터를 사용하여, 양쪽에서 삭제와 삽입을 할 수 있다. 큐와 스택을 합친 형태로 생각할 수 있다.

### 덱 구현하기

양방향 리스트를 통해서 덱을 구현해보자. 딱히 학습할만한 예제들이 없어 직접 작성한 코드라 오타 또는 잘못된 부분이 있을 수 있다.(백준 덱 문제에 적용했을 때는 정상작동 확인) 구현할 메소드는 5가지 이다.

- offerFirst: 앞에다 값 넣기
- offerLast: 뒤에다 값 넣기
- pollFirst: 앞에서 값 꺼내기
- pollLast: 앞에서 값 꺼내기
- isEmpty: 덱이 비었는지 확인

```java
public class MyDeque<E>{
	private Node<E> head;
	private Node<E> tail;

	public MyDeque() {
		this.head = null;
		this.tail = null;
	}

	public void offerFirst(E e) {
		Node<E> newHeadNode = new Node<E>(e);
		if(this.head == null) {
			this.head = newHeadNode;
			this.tail = newHeadNode;
			return;
		}
		newHeadNode.setTail(this.head);
		this.head.setHead(newHeadNode);
		this.head = newHeadNode;
	}

	public void offerLast(E e) {
		Node<E> newTailNode = new Node<E>(e);
		if(this.tail == null) {
			this.tail = newTailNode;
			this.head = newTailNode;
			return;
		}
		newTailNode.setHead(this.tail);
		this.tail.setTail(newTailNode);
		this.tail = newTailNode;
	}

	public E pollFirst() {
		if(head == null) {
			throw new NullPointerException();
		}

		E targetValue = this.head.getValue();

		if(this.head == this.tail) {
			this.head = null;
			this.tail = null;
			return targetValue;
		}

		this.head.getTail().setHead(null);
		this.head = this.head.getTail();
		return targetValue;
	}

	public E pollLast() {
		if(head == null) {
			throw new NullPointerException();
		}

		E targetValue = this.tail.getValue();

		if(this.head == this.tail) {
			this.head = null;
			this.tail = null;
			return targetValue;
		}

		this.tail.getHead().setTail(null);
		this.tail = this.tail.getHead();
		return targetValue;
	}

	public boolean isEmpty() {
		return this.head == null && this.tail == null;
	}

	class Node<E> {
		private Node<E> head;
		private Node<E> tail;
		private E val;

		Node(E e) {
			val = e;
			this.head = null;
			this.tail = null;
		}

		void setHead(Node<E> node) {
			this.head = node;
		}

		void setTail(Node<E> node) {
			this.tail = node;
		}

		Node<E> getHead() {
			return this.head;
		}

		Node<E> getTail() {
			return this.tail;
		}

		E getValue() {
			return this.val;
		}
	}
}
```

### 참고

- [덱 - 위키 백과](<https://ko.wikipedia.org/wiki/%EB%8D%B1_(%EC%9E%90%EB%A3%8C_%EA%B5%AC%EC%A1%B0)>)
