---
title: '백준 2941 크로아티아 알파벳'
date: 2020-01-10 08:26:28 -0400
path: 'codingtest/20200110croatia_alphabet'
---

```java
import java.util.*;

public class Main {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		String alphabet = sc.next();
		int count = 0;
		char currentVal = 'a';
		char prevVal = '-';
		for(int i = 0;i<alphabet.length();i++) {
			count++;
			currentVal = alphabet.charAt(i);
			if(i>0) prevVal = alphabet.charAt(i-1);
			if(currentVal == '=') {
				if(prevVal == 'c' || prevVal == 's') {
					count--;
				}else if(prevVal == 'z') {
					count--;
					if(i>1 && alphabet.charAt(i-2)=='d') {
						count--;
					}
				}
			}else if(currentVal == '-') {
				if(prevVal == 'c' || prevVal == 'd') {
					count--;
				}
			}else if(currentVal == 'j') {
				if(prevVal == 'l' || prevVal == 'n') {
					count--;
				}
			}
		}
		System.out.print(count);
	}
}
```
