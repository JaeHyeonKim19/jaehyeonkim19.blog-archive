---
title: '백준 5622 다이얼'
date: 2020-01-10 08:26:28 -0400
path: 'codingtest/20200110dial'
---

```java
import java.util.*;

public class Main {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		String str = sc.next();
		int acc = 0;
		HashMap<Character, Integer> hm = new HashMap<Character, Integer>();
		int j = 0;
		int k = 0;
		for(int i = 0;i<26;i++) {
			k = i-j;
			if((char)(i+65) == 'S' || (char)(i+65) == 'Z') {
				j++;
				k = i-j;
			}
			hm.put((char)(i+65), k/3+3);
		}
		for(int i = 0;i<str.length();i++) {
			acc += hm.get(str.charAt(i));
		}
		System.out.print(acc);
	}
}
```
