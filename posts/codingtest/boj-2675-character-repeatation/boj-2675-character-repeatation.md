---
title: '백준 2675 문자열 반복'
date: 2020-01-09 08:26:28 -0400
path: 'codingtest/20200109character_repeatation'
---

```java
import java.util.*;

public class Main {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int count = sc.nextInt();
		int [] repeatations = new int[count];
		String [] strs = new String[count];
		for(int i = 0;i<count;i++) {
			repeatations[i] = sc.nextInt();
			strs[i] = sc.next();
		}
		for(int i = 0;i<count;i++) {
			for(int j = 0;j<strs[i].length();j++) {
				char c = strs[i].charAt(j);
				for(int k = 0;k<repeatations[i];k++) {
					System.out.print(c);
				}
			}
			System.out.println("");
		}
	}
}

```
