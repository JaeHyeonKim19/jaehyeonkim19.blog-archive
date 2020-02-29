---
title: "[자바]백준 9020 골든바흐의 추측"
date: 2020-01-19 08:26:28 -0400
path: 'codingtest/20200119boj_9020_goldbachs'
---

```java
import java.util.*;

public class Main {
	static boolean isPrime(int num) {
		if (num == 1) return false;
		for(int i = 2;i <= Math.sqrt(num);i++) {
			if(num % i == 0) return false;
		}
		return true;
	}
	static int[] getGoldbachNumbers(int n) {
		int [] goldbachNumbers = new int[2];
		for(int i = n/2;true;i--) {
			if(isPrime(i)) {
				if(isPrime(n-i)) {
					goldbachNumbers[0] = i;
					goldbachNumbers[1] = n-i;
					break;
				}
			}
		}
		return goldbachNumbers;
	}
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int t = sc.nextInt();
		for(int i = 0;i < t;i++) {
			int n = sc.nextInt();
			int[] goldbachNumbers = getGoldbachNumbers(n);
			System.out.println(goldbachNumbers[0] + " " + goldbachNumbers[1]);
		}
	}
}
```
