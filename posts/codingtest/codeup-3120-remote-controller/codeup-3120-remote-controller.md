---
title: '[자바]코드업 3120 리모컨'
date: 2020-03-06 09:00:00 +0900
path: 'codingtest/20200306codeup_3120_remote_controller'
---

```java
import java.io.*;
import java.util.*;

public class Main {
	public static void main(String[] args) throws IOException{
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());
		int gap = Math.abs(Integer.parseInt(st.nextToken()) - Integer.parseInt(st.nextToken()));
		int count = 0;
		while(gap >= 8) {
			count++;
			gap = Math.abs(gap - 10);
		}
		while(gap >= 3) {
			count++;
			gap = Math.abs(gap - 5);
		}
		while(gap != 0) {
			count++;
			gap -= 1;
		}
		System.out.print(count);
	}
}
```
