---
title: '[컴퓨터구조론] 2. Instructions: Language of the Computer'
date: 2020-06-24 09:00:00 +0900
path: 'computerArchitecture/202006242-instructions-language-of-the-computer'
---

> 본 글은 영남대학교 최규상 교수님의 [컴퓨터 구조](http://www.kocw.net/home/cview.do?cid=184062fa9a833237) 강의를 듣고 작성된 글입니다.

### 2.1 Introduction

- Instruction Set
	- 명령어들의 집합(레퍼토리)이다.
	- 컴퓨터 마다 다른 Instruction Set을 가지지만 많은 공통점을 가지고 있다.
	- 초창기 컴퓨터들은 매우 단순한 Instruction Set을 가지고 있었다.(명령어의 수, 종류가 적었다는 뜻)
	- 많은 최신 컴퓨터(CPU) 또한 simple instruction sets을 가진다.
		- 물론 초창기와 최신 컴퓨터 사이에 complex instruction set을 가지는 컴퓨터도 존재한다.
		- 즉, 단순 -> 복잡 -> 단순의 과정을 거쳐왔다.
	
- Instruction Set Architecture (ISA)
	- 간단히 ISA 또는 아키텍쳐라고 불린다.
	- 하드웨어와 low level software(시스템 소프트웨어, 운영체제) 사이의 인터페이스이다.
	- 명령어, 레지스터, 메모리 접근, I/O 등 기계언어 프로그램을 쓰기위해 필요한 모든 정보를 포함하고 있다.
	- Enables implementations of varying cost and performance to run identical software

- Application Binary Interface (ABI)
	- ISA와 운영체제 인터페이스(operation system interface)를 합친 것이다.
	- ABI에서 어떠한 소프트웨어가 동작한다면 어떤한 머신에서도 동일한 ABI로 소프트웨어를 동작시킬 수 있다.

- The MIPS Instruction Set(MIPS의 Instruction Set에 대해서 배워보자!)
	- MIPS는 우리가 1장에서 배운바와같이 Millions of Instructions Per Second를 의미하기도 하지만 CPU이름이기도 하다.
	- MIPS는 처음 스탠포드에서 제안하였고 MIPS Technologies에서 상용화했다.
	- 임베디드 시장에서 많이 쓰인다.(최근에는 ARM이 많이 쓰이긴 한다.)
	- MIPS에서 사용하는 알고리즘과 특성은 많은 다른 CPU들과 공통점을 가진다.

### 2.2 Operations of the Computer Hardware

- Arithmetic Operations
	- 어셈블리에서 add a, b, c를 실행하면 b와 c를 더해서 a에 할당한다.
	- 모든 산술연산은(Arithmetic)은 다음과 같은 형태를 가진다.

2장에서 4개의 디자인 원칙을 배우게 될 것이다. 먼저 첫 번째 디자인 원칙을 만나보자

#### Design Principle 1: Simplicity favours regularity (Regularity를 사용해서 간단하게 만들어라)

>- 어떤 규칙성을 주면 구현할 때 훨씬 편리하다.
>- 간단하게 만들어야 낮은 cost로 높은 성능을 낼 수 있다.

### 2.3 Operands of the Computer Hardware

- Register Operands
	- Arithmetic Operations는 register operands를 사용한다.
	- MIPS는 32bit 레지스터를 32개 가지고 있다.
		- 이 레지스터에 자주 사용하는 데이터를 로드해서 사용한다.
		- 숫자의 범위는 0 ~ 31 이다.
		- 32비트 데이터를 word라고 부른다.(1word = 32bit)
	- 어셈블리에서는 t로 시작하는 레지스터와 s로 시작하는 레지스터가 있다.
		- $t0, $t1, ..., $t9 for temporary values
		- $s0, $s1, ..., Ss7 for saved variables(우리가 변수에 저장해서 사용하는 값들)

#### Design Principle 2: Smaller is faster

>- c.f. main memory: millions of locations
>	- 메인메모리는 레지스터에 비교하면 훨씬 크다. 그래서 메인메모리에 접근하는 시간이 레지스터에 접근하는 시간보다 훨씬 오래 걸린다.

- Register Operand 예제
	- C code: f = (g + h) - (i + j);
		-f,...,j in $s0,...,$s4
	- Compiled MIPS code:
		```
		add $t0, $s1, $s2
		add $t1, $s3, $s4
		sub $s0, $t0, $t1
		```

- Byte Address
	- 8 비트가 유용하기 때문에, 대부분의 컴퓨터의 메모리는 바이트 단위로 주소를 지정한다.
	- Alignment restriction - the memory address of a word must be on natural word boundaries (a multiple of 4 in MIPS-32)
	- Endian: 데이터를 워드에 어떤 방식으로 저장할 것인가를 말하는 것
		- Big Endian: leftmost byte is word address
			- IBM 360/370, Motorola 68k, MIPS, Sparcm HP PA
		- Little Endian: rightmost byte is word address
			- Intel 80x86, DEC Vax, DEC Alpha (Windows NT)

- Memory Operands
	- Main memory used for composite data
		- Arrays, structures, dynamic data
	- To Apply arthmetic operations
		- Load values from memory innto registers
		- Store result from register to memory
	- Memory is byte addressed
		- Each address identifies an 8-bit byte
	- Words are aligned i nmemory
		- Address must be a multiple of 4
	- MIPS is Big Endian
		- Most-significant byte at least address of a word
		- c.f. Little Endian: least-significant byte at least address

- Memory Operand Example 1
	- C code: g = h + A[8];
		- g in $s1, h in $s2 base address of A in $s3
	- Compiled MIPS code:
		- Index 8 requires offset of 32
			- 4 bytes per word
				```
				lw  $t0, 32($s3)    # lw: load word
				add $s1, $s2, $t0
				```

- Register vs Memory
	- Registers are faster to access than memory
	- Operating on memory data requires loads and stores (Load-Store Architecture)
		- More instructions to be executed
	- Compiler must use registers for variables as much as possible
		- Only spill to memory for less frequently used variables
		- Register optimization is important!

- 레지스터
	- 메인 메모리보다 빠르다
		- But register files with more locations are slower
		- e.g. a 64 word file could be as much as 50% slower than a 32 word file
		- Read/write port increase impacts speed quadratically
	- 컴파일러가 사용하기 더 쉽다(Easier for a compiler to use)
		- e.g. (A\*B) - (C\*D) - (E\*F) can do multiplies in any order vs stack
	- Can hold variables so that
		- code density improves (since register are named with fewer bits than a memory location. 레지스터의 경우 5bits, 메모리의 경우 32bits)
		- density가 높다? 코드의 직접도가 높다는 것이고 적은 코드로 어떠한 일을 수행할 수 있다는 것. 즉 같은 일을 하더라도 명령의 수가 적다.

- MIPS Register Convention

![mips-register-convention](./mips-register-convention.png)

- Immediate Operands
	- Constant data specified in an instruction
		- addi $s3, $s3, 4
	- No subtract immediate instruction
		- Just use a negative constant
		- addi $s2, $s1, -1

#### Design Principle 3: Make the common case fast
>- Small constants are common
>- Immediate operand avoids a load instruction

- The Constant Zero
	- MIPS register 0($zero) is the constant 0
		- Cannot be overwritten
	- Useful for common operations
		- E.g., move between registers
		- add $t2, $s1, $zero

### 2.4 Signed and Unsigned Numbers

- Unsigned Binary Integers
	- Given an n-bit number
		- ![binary-number](./binary-number.png)
		- Range: 0 to 2^n - 1

- 2s-Complement(2의 보수) Signed Integers
	- Given an n-bit number
		- ![2s-complement-signed-integers](./2s-complement-signed-integers.png)
		- Range: -2^(n-1) to 2^(n-1) - 1
	- Bit 31(MSB) is sign bit
		- 1 for negative numbers
		- 0 for non-negative numbers

- Signed Negation
	- Complement and add 1
	- 여기서 Complement란 1 -> 0, 0 -> 1와 같이 바꿔주는 것

- Sign Extension
	- Representing a number using more bits(2진수를 8진수, 32진수와 같이 더큰 진수로 나타내는 것. 그리고 이 때 값과 부호는 유지되어야 한다.)
		- Preserve the numeric value
	- In MIPS instruction set
		- addi: extend immediate value
		- lb, lh: extend loaded byte/halfword
		- beq, bne: extend the displacement
	- Replicate the sign bit to the left
		- c.f. unsigned values: extend with 0s
	- Examples: 8-bit to 16-bit
		- +2: 0000 0010 => 0000 0000 0000 0010
		- -2: 1111 1110 => 1111 1111 1111 1110

### 2.5 Representing Instructions in the Computer

- Representing Instructions
	- Instructions are encoded in binary
		- Called machine code
	- MIPS instructions
		- Encoded as 32-bit instruction words
		- Small number of formats encoding operationn code (opcode), register numbers, ...
		- Regularity!(이전에 이야기했던 디자인 원칙 1에 해당)
	- Register numbers
		- $t0 - $t7 are reg's 8 - 15
		- $t8 - $t9 are reg's 24 - 25
		- $s0 - $s7 are reg's 16 - 23

- MIPS R-format Instructions
	- ![mips-r-format-instructions](./mips-r-format-instructions.png)
	- Instruction fields
		- op: operation code (opcode)
		- rs: first source register number
		- rt: second source register number
		- rd: destination register number
		- shamt: shift amount (00000 for now)
		- funct: function code (extends opcode)
	- Example
		- ![r-format-example](./r-format-example.png)

- Hexadecimal
	- Base 16
		- Compact representation of bit strings
		- 4 bits per hex digit

- MIPS I-format Instructions
	- ![mips-i-format-instructions](./mips-i-format-instructions.png)
	- Immediate arithmetic and load/store instructions
		- rt: destination or source register number
		- Constant: -2^15 to +2^15 - 1
		- Address: offset added to base address in rs

#### Design Principle 4: Good design demands good compromises

>- Different formats complicate decoding, but allow 320bit instructions uniformly
>- Keep formats as similar as possible
>- MIPS I-format instructions를 살펴보면 Immediate arithmetic 과 load/store instructions는 서로 다른 명령이지만 같은 포맷을 가진다. 이것이 바로 good compromises.

- Stored Program Computers
![stored-program-computers](./stored-program-computers.png) 
	- Instructions represented in binary, just like data
	- Instructions and data stored in memory
	- Programs can operate on programs
		- e.g., compilers, linkers, ...
	- Binary comptibility allows compiled programs to work on different computers
		- 표준화된 ISA가 지원되면 가능하다.(Standardized ISAs)

### 2.6 Logical Operations

- Logical Operations(논리 연산)
	- Instructions for bitwise manipulation 

	|Operation|C|Java|MIPS|
	|---|---|---|---|
	|Shift left|<<|<<|sll|
	|Shift right|>>|>>>|srl|
	|Bitwise AND|&|&|and, andi|
	|Bitwise OR|\||\||or, ori|
	|Bitwise NOT|~|~|nor|

	- Useful for extracting and inserting groups of bits in a word

- Shift Operations

	![shift-operations](./shift-operations.png)

	- shamt: how many positions to shift
	- Shift left logical
		- Shift left and fill whit 0 bits
		- sll bt i bits multiplies by 2^i
	- Shift right logical
		- Shift right and fill with 0 bits
		- srl by i bits divides by 2^i (unsigned only)

- AND Operations
	- Useful to mask bits in a word
		- Select some bits, clear others to 0

- OR Operations
	- Useful to include bits in a word
		- Set some bits to 1, leave others unchanged

- NOT Operations
	- Useful to innvert bits in a word
		- Change 0 to 1, and 1 to 0
	- MIPS has NOR 3-operand instruction
		- a NOR b == NOT (a OR b)

### 2.7 Instructions for Making Decisions

- Conditional Operations
	- Branch to a labeled instruction if a condition is true
		- Otherwise, continue sequentially
	- beq rs, rt, L1
		- if (rs == rt) branch to instruction labeled L1;
	- bne rsm rtm L1
		- if (rs != rt) branch to instruction labeled L1;
	- j L1
		- unconditional jump to instruction labeled L1

- Compiling If Statements
	- C code
		```
		if (i==j) f = gh;
		else f = g-h;
		```
		- f, g, ... in $s0, $s1, ...
	- Compiled MIPS code
		```
			bne $s3, $s4, Else
			add $s0, $s1, $s2
			j Exit
		Else: sub $s0, $s1, $s2
		Exit: ... <- Assembler calculates addresses
		```

- Compiling Loop Statements
	- C code
		```
		while (save[i] == k) i += 1;
		```
		- i in $s3, k in $s5, address of save in $s6
	- Compiled MIPS code
		```
		Loop: sll $t1, $s3, 2
			add $t1, $t1, $s6
			lw $t0, 0($t1)
			bne $t0, $s5, Exit
			addi $s3, $s3, 1
			j Loop
		Exit: ...
		```

- Basic Blocks
	- A basic block is a sequence of instructios with
		- No embedded branches (except at end)
		- No branch targets (except at beginning)

		![basic-blocks](./basic-blocks.png)

		- A compiler identifies basci blocks for optimization
		- An advanced processor can accelerate execution of basic blocks

- More Conditional Operations
	- Set result to 1 if a condition is true
		- Otherwise, set to 0
	- slt rd, rs, rt
		- if(rs\<rt) rd = 1; else rd = 0;
	- slti rt, rs ,constant
		- if(rs\<constant) rt = 1; else rt = 0;
	- Use in combination with beq, bne
		```
		slt $t0, $s1, $s2 # if ($s1 < $s2)
		bne $t0, $zero, L # branch to L
		```

- Branch Instruction Design
	- Why not blt, bge, etc?
	- Hardware for <, >=, ... slower than =, !=
		- Combining with branch involves more work per instruction, requiring a slower clock(clock period)
		- All instructions penalized!
	- beq and bne are the common case
	- This is good design compromise

- Signend vs Unsigned
	- Siged comparison: slt, slti\
	- Unsigned comparison: sltu, sltui
