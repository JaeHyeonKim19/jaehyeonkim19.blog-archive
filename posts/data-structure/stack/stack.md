---
title: '[자료구조] 스택(Stack)'
date: 2020-10-20 09:00:00 +0900
path: 'data-structure/20201020stack'
---

## 스택

후입선출(LIFO, Last In First Out)의 자료구조. 이를테면 a, b, c 순서대로 넣은 다음 하나씩 꺼내면 c, b, a 순서로 나오게 된다. 스택에서 데이터를 넣는 작업을 푸시(push), 스택에서 데이터를 꺼내는 작업을 팝(pop)이라고 한다.

![stack](https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Data_stack.svg/1280px-Data_stack.svg.png)

### 스택 구현하기

스택은 배열 또는 리스트를 활용해서 구현할 수 있다. 여기서는 배열을 활용하여 int 값을 저장하는 스택을 구현해보겠다. 메소드로는 스택의 대표적인 메소드인 push, pop, peek을 구현하도록 하겠다.

```java
public class IntStack{
	private int max; // 스택 용량
	private int ptr; // 스택 포인터
	private int[] stk; // 스택 본체

	// 실행 시 예외: 스택이 비어 있음
	public class EmptyIntStackException extends RuntimeException {
		public EmptyIntStackException() {}
	}

	// 실행 시 예외: 스택이 가득 참
	public class OverflowIntStackException extends RuntimeException {
		public OverflowIntStackException() {}
	}

	// 생성자
	public IntStack(int capacity) {
		ptr = 0;
		max = capacity;
		try {
			stk = new int[max]; // 스택 본체용 배열을 생성
		} catch (OutOfMemoryError e) { // 생성할 수 없음
			max = 0;
		}
	}

	// 스택에 x를 푸시
	public int push(int x) throws OverflowIntStackException {
		if (ptr >= max) { // 스택이 가득 참
			throw new OverflowIntStackException();
		}
		return stk[ptr++] = x;
	}

	// 스택에서 데이터를 팝(정상에 있는 데이터를 꺼냄)
	public int pop() throws EmptyIntStackException {
		if (ptr <= 0) { // 스택이 비어있음
			throw new EmptyIntStackException();
		}
		return stk[--ptr];
	}

	// 스택에서 데이터를 피크(정상에 있는 데이터를 들여다봄)
	public int peek() throws EmptyIntStackException {
		if (ptr <= 0) { // 스택이 비어있음
			throw new EmptyIntStackException();
		}
		return stk[ptr - 1];
	}
}
```

## 참고

- [스택 - 나무위키](https://namu.wiki/w/%EC%8A%A4%ED%83%9D(%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0))
- [스택 - 위키백과](https://ko.wikipedia.org/wiki/%EC%8A%A4%ED%83%9D)
- [자료구조와 함께 배우는 알고리즘 입문 (자바편)](http://www.yes24.com/Product/Goods/60547893)