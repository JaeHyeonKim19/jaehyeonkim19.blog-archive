---
title: '[컴퓨터구조론] 1. Computer Abstractions and Technology'
date: 2020-06-11 09:00:00 +0900
path: 'computerArchitecture/202006111-computer-abstractions-and-technology'
---

> 본 글은 영남대학교 최규상 교수님의 [컴퓨터 구조](http://www.kocw.net/home/cview.do?cid=184062fa9a833237) 강의를 듣고 작성된 글입니다.

### 1.1 Introduction

컴퓨터 기술은 [무어의 법칙(Moore's Law)](https://ko.wikipedia.org/wiki/%EB%AC%B4%EC%96%B4%EC%9D%98_%EB%B2%95%EC%B9%99)에 따라 급격하게 발전해왔다. 이렇게 급격한 발전한 컴퓨터 기술에 의해서 다양한 어플리케이션이 가능하게 되었다.

> 무어의 법칙: 반도체 직접회로의 성능이 24개월마다 2배로 증가한다는 법칙. 실제로는 2배보다 더 빠르게 늘어왔음.

- 컴퓨터의 종류에는 개인 컴퓨터, 서버 컴퓨터, 슈퍼 컴퓨터, 임베디드 컴퓨터가 있다
	- 개인 컴퓨터
		- 우리가 흔히 사용하는 컴퓨터이다.
		- 일반적인 목적으로 사용되고 가성비에 민감하다.
	- 서버 컴퓨터
		- High capacity, performance, reliability
	- 슈퍼 컴퓨터
		- 아주 특수한 목적(High-end scientific and engineering calculations)에 사용되는 컴퓨터.
		- 우리나라에서는 기상청, 국방연구소 등에서 사용하고 있다.
	- 임베디드 컴퓨터
		- 임베디드는 '내장된'이라는 의미를 가진다. 즉, 큰 시스템에 컴퓨터가 하나의 컴포넌트로 이루어져있는 것을 말한다.
		- 전력소모가 적고, 저성능, 저비용의 특징을 가진다.

```
앞으로 자주 사용하게 될 바이트의 단위에 대해서 공부하고 넘어가도록 하자.
Kilobyte: 1,024 bytes(2^10 bytes)
Megabyte: 1,048,576 bytes(2^20 bytes)
Gigabyte: 1,073,741,824 bytes(2^30 bytes)
Terabyte: 1,099,511,627,776 bytes(2^40 bytes)
Petabyte: 1024 terabytes(2^50 bytes)
Exabyte: 1024 petabytes(2^60 bytes)
```

- PostPC 시대
	- Personal Mobile Device(PMD)
		- 배터리로 동작한다.
		- 인터넷에 연결되어 있다.
		- 스마트폰, 테블릿 피시, electronic glasses 등이 있다,
	- Cloud computing
		- Warehouse Scale Computers(WSC)
		- 서버 팜에서 우리가 필요한 만큼 할당받아서 사용할 수 있다.
		- Software as a Service(SaaS): 내가 필요한 소프트웨어를 서비스로 제공받을 수 있다.
		- 내가 사용하는 소프트웨어의 일부분은 PMD에서 실행되고 나머지 중요한 부분은 Cloud에서 실행된다.
		- AWS, AZURE 등이 있다.

- 우리가 이번 챕터에서 배울 내용은 다음과 같다.
	- 프로그램이 어떻게 머신 랭기지로 바뀔 것인가. 즉, 어떻게 하드웨어가 명령들을 실행할 것인가.
	- The hardware/software interface
	- performance의 정의
	- 하드웨어 디자이너들은 어떻게 성능을 향상시키는가
	- parallel processing은 무엇인가

- 성능?
	- 알고리즘에서 성능
		- operation의 수로 결정된다.
	- Programming language, compiler, architecture에서 성능
		- machine instructions의 수로 결정된다.
	- 프로세서와 메모리 시스템에서 성능
		- 얼마나 명령어를 빨리 실행할 것인가
	- I/O 시스템(OS 포함)에서 성능
		- I/O operations의 수로 결정된다.

### 1.2 Eight Great Ideas in Computer Architecture

1. Design for Moore's Law
2. Use abstraction to simplify design
3. Make the common case fast
4. Performance via parallelism
5. Performance via pipelining
6. Performance via prediction
7. Hierarchy of memories
8. Dependability via redundancy

여기 나와 있는 8가지 아이디어들이 컴퓨터 성능 향상에 지대한 역할을 함!

### 1.3 Below your program...

![below-program](./below-program.png)

- 프로그램 밑에...
	- Application Software
		- Written in high-level language
		- 파워포인트, 웹 브라우저 등
	- System software
		- Compiler: translates HLL code to machine code
		- Operating System: service code
			- Handling input/output
			- Managing memory and storage
			- Scheduling tasks & sharing resources
	- Hardware
		- Processor, memory, I/O controllers

- Levels of Program Code
	- High-level language
		- Level of abstraction closer to problem domain
		- Provides for productivity and portability
	- Assembly language
		- Textual representation of instructions
	- Hardware representation
		- Binary digits
		- Encoded instructions and data

![level-of-language](./level-of-language.png)

### 1.4 Under the Covers

- 대부분의 컴퓨터들은 비슷한 구성요소를 가지고 있다
	- 입/출력 장치
		- 유저 인터페이스 장치
			- 디스플레이, 키보드, 마우스, 터치 스크린 등
		- 저장 장치
			- 하드디스크, 시디 등
		- 네트워크 어댑터
			- 다른 컴퓨터와 통신하기위해 필요

- 프로세서(CPU) 내부에는
	1. 데이터 패스
		- 데이터가 어떻게 연산되는지 
	2. 컨트롤
		- 프로세서에 있는 다양한 컴포넌트들을 컨트롤 하는 것
	3. 캐시 메모리
		- SRAM으로 구성된 메모리에 자주쓰는 데이터를 올려두는 곳

- 추상화(Abstraction)
	- 아주 복잡한 문제를 단순화해서 쉽게 풀 수 있도록하는 기법
		- ex) Instruction set architecture(ISA): The hardware/software interface
	
- 저장 장치
	- 휘발성 메인 메모리
		- 전원이 꺼지면 데이터들이 지워짐
	- 비휘발성 세컨더리 메모리
		- 마그네틱 디스크
		- 플래시 메모리
		- 옵티컬 디스크

- 네트워크
	- LAN, WAN, 와이파이, 블루투스 등

### 1.5 Technologies for Building Processors and Memory

Electronics technology는 계속 발전해왔다. 용량과 성능은 향상되고 가격은 저렴해졌다. 그 발전 양상은 아래표를 보면 상대적으로 알 수 있다.

|Year|Technology|Relative performance/cost|
|---|---|---|
|1951|진공관|1|
|1965|트랜지스터|35|
|1975|IC(Integrated circuit)|900|
|1995|VLSI(Very large scale IC)|2,400,000|
|2013|Ultra large scale IC|250,000,000,000|

### 1.6 Performance

- Response time
	- 하나의 일을 하는데 소요되는 시간
- Throughput
	- 단위시간당 얼마나 많은 일을 할 수 있는가?

- 더 빠른 CPU로 교체 시?
	- Response time 짧아짐
	- Throughput 증가
- CPU를 추가하면?
	- Response time 그대로
	- Throughput 증가

Response time이 줄어들면 Throughput은 무조건 줄어들지만 Throughput이 줄어든다고해서 Response time이 줄어드는 것은 아니다. 컴퓨터 구조에서 퍼포먼스는 Response time 또는 Throughput으로 이야기하는데, 우리는 Response time에 집중해서 살펴보도록 하겠다.

__Performance = 1/Execution Time__

- `X is n time faster than Y`
	- `Performance X/Performance Y = Execution time Y/Execution time X = n`

- Measuring Execution time
	- Elapsed time(시스템 퍼포먼스를 정의할 때 사용)
		- Total response time, including all aspects
			- Processing, I/O, OS overhead, idle time
	- CPU time
		- Time spent processing a given job
		- user CPU time, system CPU time
		- 프로그램에 따라 CPU나 시스템의 영향이 다를 수 있다.(어떤 프로그램은 CPU 성능, 어떤 프로그램은 I/O의 엉향 다양하게 영향을 미칠 수 있다.)

- CPU Clocking
	- Rising edge to Rising edge = Clock period

- Clock rate(clock cycles per second in MHz or GHz) is inverse of clock cycle time(clock period)
```
CC = 1 / CR
```

- CPU Time
	- 퍼포먼스는 다음의 경우에 향상된다.
		- 클락 사이클의 감소
		- 클락 레이트의 증가
	- 따라서 하드웨어 디자이너들은 클락 사이클과 클락 레이트에 유의해서 설계해야 한다.
```
CPU Time = CPU Clock Cycles X Clock Cycle Time = CPU Clock Cycles / Clock Rate
```

- Instruction Count and CPI(Cycles per Instruction)
	- Instruction의 수는 프로그램, [ISA](https://en.wikipedia.org/wiki/Instruction_set_architecture), 컴파일러에 의해 결정된다.
	- CPI는 CPU에 의해서 결정되며, 명령어들이 다른 CPI를 가질 경우 평균 CPI를 사용하여야 한다.

```
Clock Cycles = Instruction X Cycles per Instruction
CPU Time = Instruction Count X CPI X Clock Cycle Time
= Instruction Count X CPI / Clock Rate
```

- Instruction의 종류가 다양할 때는 Weighted average CPI를 사용해야한다.

![weighted-average-cpi](./weighted-average-cpi.jpg)

- Performance Summary
	- 퍼포먼스는 알고리즘, 프로그래밍 언어, 컴파일러, ISA에 의존적이다.

```
CPU Time = Instructions / Program X Clock cycles / Instruction X Seconds / Clock cycle
```

### 1.7 The Power Wall

Clock Rate(Frequency)는 2004년까지 가파르게 증가하다 이후로는 유지되고 있고 전력소모 또한 2004년까지 같이 증가하다 그 이후로는 조금씩 감소하는 경향을 보이고 있다.

우리가 사용하는 칩의 전력소모량은 다음 공식으로 구할 수 있다.
```
Power = Capacitive load X Voltage^2 X Frequency
```

2004년까지의 기간 동안 Freqency는 1000배 증가한 반면 Power는 30배 가량 증가하였는데, 그 이유는 Voltage가 1/5배(5V -> 1V)로 감소하였기 때문이다.

- Power wall 이란?
	- 우린 더 이상 전력을 낮출 수 없다.
	- 그 말은 발생하는 열의 양을 더 이상 낮출 수 없다는 뜻이다.

2004년 부터 Clock Rate을 더 이상 증가 시킬 수 없었던 이유는 전력을 낮출 수 가 없어 발생하는 열을 없앨 수 없었기 때문이다. 따라서 이 때 부터는 다른 방법으로 성능을 향상시켜야 했다. 그 방법이 바로 __멀티코어__ 다.

### 1.8 The Sea Change: The Switch to Multiprocessors

멀티코어는 하나의 칩에 여러개의 프로세스를 넣은 것을 말한다.(흔히들 말하는 멀티코어!)

단 멀티코어에서 성능향상을 이루기 위해서는 parallel programming이 요구된다. 하지만 parallel programming을 위해서는
1. parallel programming에 맞게 프로그램을 작성해야한다.
2. 로드 밸런싱을 고려해야 한다.
3. 커뮤니케이션과 동기화를 최적화 해야한다.

그래서 유니코어에 비해서 멀티코어에서는 성능향상을 이루기가 어렵다.

### 1.9 Concluding Remarks

- Cost/performance is improving
	- Due to underlying technology development
- Hierachial layers of abstraction
	- In both hardware and software
- Instruction set architecture
	- The hardware/software interface
- Execution time: the best performace measure
- Power is a limiting factor
	- Use parallelism to improve performance

### 1.10 Fallacies and Pitfalls

- [Amdahl's Law](https://ko.wikipedia.org/wiki/%EC%95%94%EB%8B%AC%EC%9D%98_%EB%B2%95%EC%B9%99)
	- 컴퓨터 시스템의 일부분을 개선 할 경우에 전체적으로 얼마만큼의 성능 향상이 있는지 계산하는 데 사용된다.
```
T(improved) = T(affected) / improvement factor + T(unaffected)
```
즉, 성능 향상된 일부가 전체에서 차지하는 분율만큼 전체 성능 향상에 기여한다는 뜻.

전체 시스템 성능을 많이 향상 시키고 싶으면 시스템에서 차지하는 분율이 큰 부분을 개선해야한다.(make the common case fast)

#### Fallacy: Low Power at Idle

- i7 파워 벤치마크를 살펴보면
	- 100% load 일 경우에는 258W
	- 50% load 일 경우에는 170W
	- 10% load 일 경우에는 121W
	- 10%만 load 했을 경우에는 전력도 10%일 것 같지만 실제로는 10%보다 훨씬 많은 전력을 소모한다.

- 구글 데이터 센터를 살펴보면 대부분 10 ~ 50% load된 상태로 동작한다. 100% load되는 경우는 전체 작동시간의 1%도 되지 않는다.
- 따라서, 우리는 프로세서를 만들 때 전력소모를 load에 비례하도록 만들어야 한다.

#### Pitfall: MIPS as a Performance Metric

- MIPS: Millions of Instructions Per Second
- 기존에는 MIPS를 퍼포먼스의 척도로 사용했는데, 다음과 같은 이유로 MIPS를 퍼포먼스의 척도로 사용하는 것은 적합하지 않다.
	- 컴퓨터마다 ISA가 다르다.
	- 명령어마다 복잡성이 다르다.

![mips](./mips.png)

- 위 공식을 보면 MIPS는 CPI의 영향을 받는다. 그런데 CPI는 CPU와 프로그램에 따라 바뀔 수 있다. 따라서 MIPS는 정확한 성능 측정 단위라고 할 수 없다. MIPS 대신 SEPC CPU Benchmark와 같은 프로그램을 사용하는게 더 정확한 성능 측정 방법이다.
