---
title: '[자바]백준 2231 분해합'
date: 2020-02-12 08:26:28 -0400
path: 'codingtest/20200212boj_sum_aparts'
---

```java
import java.io.*;

public class Main {
	public static void main(String[] args) throws IOException{
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int n = Integer.parseInt(br.readLine());
		int temp;
		String strTemp;
		for(int i = 0; i < n; i++) {
			temp = i;
			strTemp = Integer.toString(i);
			for(int j = 0; j < strTemp.length() ; j++) {
				temp += ((int)strTemp.charAt(j) - 48);
			}
			if(temp == n) {
				System.out.print(i);
				return;
			}
		}
		System.out.print(0);
	}
}
```
