---
title: '[자바]백준 2953 나는 요리사다'
date: 2020-02-12 08:26:28 -0400
path: 'codingtest/20200212boj_2953_chef'
---

```java
import java.io.*;
import java.util.*;

public class Main {

	public static void main(String[] args) throws IOException{
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer("");
		int who = 0;
		int score = 0;
		for(int i = 1; i <= 5; i++) {
			st = new StringTokenizer(br.readLine());
			int curScore = 0;
			for(int j = 0; j < 4; j++) {
				curScore += Integer.parseInt(st.nextToken());
			}
			if(curScore > score) {
				score = curScore;
				who = i;
			}
		}
		System.out.print(who + " " + score);
	}

}
```
