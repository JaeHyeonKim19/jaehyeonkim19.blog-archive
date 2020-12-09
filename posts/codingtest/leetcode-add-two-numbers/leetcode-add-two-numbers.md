---
title: '[자바]LeetCode - Add Two Numbers'
date: 2020-12-09 09:00:00 +0900
path: codingtest/20201209leetcode-add-two-numbers'
---

## 문제

[LeetCode - Add Two Numbers](https://leetcode.com/problems/add-two-numbers/)

## 풀이

음수가 아닌 정수를 나타내는 비어있지 않은 2개의 연결 리스트가 주어져있다. 각 정수는 역순으로 들어있고 한 자리 숫자를 포함하고 있다. 두 숫자의 합을 링크드 리스트로 리턴해야한다.

특별히 어려운 사항은 없다. 유의해야할 부분은 다음 노드가 있는지(null 체크) 확인해야하고 carry 유뮤를 확인해줘야 한다는 것이다.

첫 번째 노드가 1의 자리 숫자를 나타내기 때문에 첫 번째 노드부터 차례대로 더해주면 된다. 두 번째 노드부터는 각 숫자의 두 번째 노드 합 + 이전 자리 숫자의 carry로 계산해줘야한다.

## 코드

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {

  public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
    ListNode answer = new ListNode((l1.val + l2.val) % 10);
    ListNode currentAnswerNode = answer;
    int carry = (l1.val + l2.val) / 10 > 0 ? 1 : 0;
    ListNode currentL1Node = l1.next;
    ListNode currentL2Node = l2.next;
    while (currentL1Node != null || currentL2Node != null) {
      int l1Val = currentL1Node != null ? currentL1Node.val : 0;
      int l2Val = currentL2Node != null ? currentL2Node.val : 0;

      int result = carry + l1Val + l2Val;
      currentAnswerNode.next = new ListNode(result % 10);
      currentAnswerNode = currentAnswerNode.next;
      carry = result / 10 > 0 ? 1 : 0;

      currentL1Node = currentL1Node == null ? null : currentL1Node.next;
      currentL2Node = currentL2Node == null ? null : currentL2Node.next;
    }
    if(carry == 1) {
      currentAnswerNode.next = new ListNode(carry);
    }
    return answer;
  }
}
```