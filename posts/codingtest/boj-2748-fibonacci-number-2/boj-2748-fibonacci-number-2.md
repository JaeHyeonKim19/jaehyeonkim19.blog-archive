---
title: '[자바]백준 2748 피보나치 수 2'
date: 2020-01-30 08:26:28 -0400
path: 'codingtest/20200130boj_2748_fibonacci_number_2'
---

n의 범위가 90이하의 자연수임에 유의하자. int 자료형을 사용하면 90을 넣었을 때 출력가능한 범위를 벗어나게된다. 따라서 long 자료형을 사용하도록 하자.

```java
import java.util.*;

public class Main {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int n = sc.nextInt();
		long [] fibonaccis = new long [n+1];
		fibonaccis[0] = 0;
		if(n >= 1)fibonaccis[1] = 1;
		for(int i = 2;i < n+1;i++) {
			fibonaccis[i] = fibonaccis[i-1] + fibonaccis[i-2];
		}
		System.out.println(fibonaccis[n]);
	}
}
```
