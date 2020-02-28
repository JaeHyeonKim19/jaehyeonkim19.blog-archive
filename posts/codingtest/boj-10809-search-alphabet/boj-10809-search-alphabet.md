---
title: '백준 10809 알파벳 찾기'
date: 2020-01-09 08:26:28 -0400
path: 'codingtest/20200109boj_10809_search_alphabet'
---

```java
import java.util.*;

public class Main {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		String word = sc.next();
		for(int i = 97;i<123;i++) {
			int loc = -1;
			for(int j = 0;j<word.length();j++) {
				if(i==(int)word.charAt(j)) {
					loc = j;
					break;
				}
			}
			System.out.print(loc + " ");
		}
		sc.close();
	}
}

```

자바 String 내장함수 `indexOf()`를 활용한 풀이

```java
import java.io.*;

public class Main {

	public static void main(String[] args) throws IOException{
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
		String s = br.readLine();
		int index = 0;
		for(int i = 97; i <= 122; i++) {
			index = s.indexOf((char)i);
			bw.write(index + " ");
		}
		bw.flush();
	}
}
```
