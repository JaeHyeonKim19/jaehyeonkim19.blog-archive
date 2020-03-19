---
title: '[자바]백준 15651 N과 M (3)'
date: 2020-02-16 08:26:28 +0900
path: 'codingtest/20200216boj_15651_n_and_m_3'
---

```java
import java.io.*;
import java.util.*;

class Main {
    static BufferedWriter bw;
    static int[] nums;

    static void rec(int n, int count) throws IOException {
        if (count == nums.length) {
            for (int i = 0; i < nums.length; i++) {
                bw.write(nums[i] + " ");
            }
            bw.write("\n");
            return;
        }
        for (int i = 1; i <= n; i++) {
            nums[count] = i;
            rec(n, count + 1);
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int n = Integer.parseInt(st.nextToken());
        int m = Integer.parseInt(st.nextToken());
        nums = new int[m];
        rec(n, 0);
        bw.flush();
    }
}
```
