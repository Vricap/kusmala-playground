const code = document.getElementById("code");
const outputBlock = document.querySelector(".output-block");

let url = "http://localhost:8000";

const runCode = () => {
  let codeToRun = code.value;
  outputBlock.textContent = "Running your code...";

  fetch(url + "/run", {
    method: "POST",
    headers: {
      "Content-Type": "plain/text",
    },
    body: codeToRun,
  })
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      outputBlock.textContent = data;
    })
    .catch((error) => {
      outputBlock.textContent = error;
    });
};

const example = {
  "hello world": `// selamat datang di bahasa pemrograman KUSMALA

cetak("Hello World!");`,
  fibonacci: `// fungsi rekursif untuk generate barisan fibonacci
buat fib = fungsi(a, b, limit) {
  jika(a > limit) {
  	kembalikan a;
  } lainnya {
  	cetak(a, " ");
  	fib(b, a + b, limit);
  }
}

buat num = 8;
fib(0, 1, num);
`,
  faktorial: `buat faktorial = fungsi(x) {  // fungsi literal
  jika(x == 1) {  // kondisional
  	kembalikan 1;
  } lainnya{
  	 kembalikan x * faktorial(x - 1);  // rekursif
  }
}

buat nilai = 5;
buat hasil = faktorial(nilai);  // pemanggilan fungsi
cetak("Hasil dari faktorial", nilai, "adalah", hasil);  // cetak akan mengeluarkan hasil ke stdout
`,
  loop: `// kusmala belum tersedia loop, kita akali dengan rekursif

buat loop = fungsi(start, end) {
	jika(start > end) {
		kembalikan start;
	}
	cetak("sekarang:", start);
	kembalikan loop(start + 1, end);
}

loop(1, 10);
`,
  piramida: `buat buatRuang = fungsi(n, ruang) {
	jika(n < 2) {
		kembalikan ruang;
	}
	ruang = ruang + " ";
	buatRuang(n - 1, ruang);
}

buat cetakBintang = fungsi(n, bintang, ruang) {
	jika(n < 2) {
		cetak(ruang + bintang);
		kembalikan;
	}
	bintang = bintang + "*";
	cetakBintang(n - 1, bintang, ruang);
}

buat cetakBarisPiramida = fungsi(baris, totalBaris) {
	jika(baris > totalBaris) {
		kembalikan;
	}
	// buat ruang
	buat ruang = buatRuang(totalBaris - baris, " ");

	// cetak bintang
	buat bintang = "*";
	cetakBintang(2 * baris - 1, bintang, ruang);

	cetakBarisPiramida(baris + 1, barisTotal);
}

buat barisTotal = 10;
cetakBarisPiramida(1, barisTotal);
`,
  array: `buat array = [1, "helo", benar, 1 + 2];
cetak(array[1]);

buat f = fungsi() {
	kembalikan [1, "helo", benar, 1 + 2];
}

cetak(f()[0 + 1]);
// gunakan fungsi bawaan 'panjang()' untuk melihat panjang array
cetak(array[panjang(array) - 1]); // elemen terakhir
`,
};

// initialize option value
document.getElementById("examples-select").value = "hello world";
code.value = example["hello world"];
updateLineNumbers();

document
  .getElementById("examples-select")
  .addEventListener("change", function () {
    let selectedExample = this.value;
    code.value = example[selectedExample];
    updateLineNumbers();
  });
