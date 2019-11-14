let comments = [
	"Co by było gdyby Polacy wygrali Powstanie Listopadowe",
	"Co by było gdyby Polacy wygrali powstanie Styczniowe",
	"Co by było gdyby Hitler nie doszedł do władzy",
	"Co by było gdyby Europejczycy nie odkryli Ameryki",
	"Co by było gdyby Polacy wygrali powstanie krakowskie",
	"Co by było gdyby powstanie kościuszkowskie nie wybuchło",
	"Co by było gdyby Polacy przegrali bitwę Warszawską",
	"Co by było gdyby Władysław IV został carem Rosji",
	"Co by było gdyby Maksymilian Habsburg został królem Polski, a nie Zygmunt III Waza",
	"Co by było gdyby Ernest Habsburg został królem Polski, a nie Henryk Walezy",
	"Co by było gdyby Stefan Batory żył dłużej",
	"Co by było gdyby Kazimierz Wielki miał prawowitego syna",
	"Co by było gdyby Niemcy wygrały drugą wojnę światową",
	"Co by było gdyby biali wygrali wojnę domową w Rosji",
	"Co by było gdyby Frankowie przegrali wojnę z Arabami",
	"Co by było gdyby Rzym przegrał wojnę z Kartaginą",
	"Co by było gdyby Aleksander Wielki żył dłużej",
	"Co by było gdyby Władysław Warneńczyk wygrał bitwę pod Warną",
	"Co by było gdyby Mieszko nie przyjął chrztu",
	"Co by było gdyby komuniści wygrali wojnę domową w Hiszpanii",
	"Co by było gdyby w Niemczech po pierwszej wojnie światowej do władzy doszli monarchiści",
	"Co by było gdyby we Francji po pierwszej wojnie światowej doszli komuniści",
	"Co by było gdyby Imperium Osmańskie wygrało bitwę pod Wiedniem",
	"Co by było gdyby doszło do wojny pomiędzy III Rzeszą, a Czechosłowacją w 1938 roku",
	"Co by było gdyby Francja wygrała z Niemcami w 1940 roku",
	"Co by było gdyby Indianie odparli Hiszpanów",
	"Co by było gdyby Trocki doszedł do władzy w ZSRR",
	"Co by było gdyby Henryk Probus żył dłużej",
	"Co by było gdyby Roman Dmowski przejął władzę w II Rzeczypospolitej",
	"Co by było gdyby nie było rozbicia dzielnicowego",
	"Co by było gdyby Islam nie powstał",
	"Co by było gdyby Węgrzy wygrali powstanie w 1848 roku",
	"Co by było gdyby wybuchła trzecia wojna światowa podczas zimnej wojny",
	"Co by było gdyby Rosja wygrała pierwszą wojnę światową",
	"Co by było gdyby Ententa wygrała pierwszą wojnę światową bez pomocy USA",
	"Co by było gdyby Francja pokonała Prusy w XIX wieku",
	"Co by było gdyby Franciszek Józef żył dłużej",
	"Co by było gdyby w 1904 roku wybuchła wielka wojna pomiędzy Rosją i Francją, a Japonią i Wielką Brytanią",
	"Co by było gdyby Chrześcijaństwo nie powstało",
	"Co by było gdyby Imperium Rzymskie nie upadło",
	"Co by było gdyby Imperium Karolińskie się nie podzieliło",
	"Co by było gdyby Karol XII wygrał III wojnę północną",
	"Co by było gdyby Przemysł Ottokar II wygrał bitwę pod Suchymi Krutami",
	"Co by było gdyby unia Polsko-Czeska z XIV wieku przetrwała",
	"Co by było gdyby Władysław Łokietek nie zjednoczył Polski w XIV wieku",
	"Co by było gdyby Bolesław II Śmiały nie został obalony",
	"Co by było gdyby unia Polsko-Czeska z XIV wieku przetrwała",
	"Co by było gdyby Wilhelm Zdobywca przegrał bitwę pod Hastings",
	"Co by było gdyby Bizancjum przetrwało",
	"Co by było gdyby Persowie  wygrali z Aleksandrem Wielkim",
	"Co by było gdyby Konfederacja wygrała wybory w Polsce",
];

function getRandomComment() {
	return comments[Math.round(Math.random() * 1000) % comments.length];
}

function escapePrefix(string, prefix) {
	return string.split(prefix)[1];
}

for (let j = 0; j < 100; j++) {
	let comment1 = escapePrefix(getRandomComment(), "Co by było gdyby ");
	let comment2 = escapePrefix(getRandomComment(), "Co by było gdyby ");

	let com1arr = comment1.split(" ");
	let com2arr = comment2.split(" ");

	let string = "Co gdyby " + com1arr[0] + " " + com1arr[1] + " " + com1arr[2] + " ";

	for (let i = 3; i < com2arr.length; i++) {
		string = string + com2arr[i];
		if (i === com2arr.length - 1) string += "?";
		else string += " ";
	}
	console.log(j + ". " + string);

}