function calcola() {
    let capitale = parseFloat(document.getElementById("capitale").value);
    let tasso = parseFloat(document.getElementById("tasso").value) / 100;
    let anni = parseFloat(document.getElementById("anni").value);
    let frequenza = parseInt(document.getElementById("frequenza").value);
    let tipo = document.querySelector(".tab.active").innerText.toLowerCase();
    let contributi = document.getElementById("contributi").value;
    let importoContributo = parseFloat(document.getElementById("importo-contributo").value);
    let incremento = parseFloat(document.getElementById("incremento").value) / 100;
    let montante = capitale;
    let interesseTotale = 0;
    let dettagli = "";

    if (isNaN(capitale) || isNaN(tasso) || isNaN(anni) || capitale <= 0 || tasso <= 0 || anni <= 0) {
        alert("Per favore, inserisci valori validi.");
        return;
    }

    for (let anno = 1; anno <= anni; anno++) {
        let interesseAnno;

        if (tipo.includes("composto")) {
            interesseAnno = montante * (Math.pow(1 + tasso / frequenza, frequenza) - 1);
        } else if (tipo.includes("semplice")) {
            interesseAnno = capitale * tasso;
        } else if (tipo.includes("giornaliero")) {
            interesseAnno = montante * (Math.pow(1 + tasso / 365, 365) - 1);
        }

        interesseTotale += interesseAnno;
        montante += interesseAnno;

        // Gestione dei contributi
        if (contributi !== "none") {
            if (contributi === "depositi" || contributi === "entrambi") {
                montante += importoContributo;
            }
            if (contributi === "prelievi" || contributi === "entrambi") {
                montante -= importoContributo;
            }
            importoContributo += importoContributo * incremento;
        }

        dettagli += `<tr>
            <td>${anno}</td>
            <td>${interesseAnno.toLocaleString("it-IT", { style: "currency", currency: "EUR" })}</td>
            <td>${interesseTotale.toLocaleString("it-IT", { style: "currency", currency: "EUR" })}</td>
            <td>${montante.toLocaleString("it-IT", { style: "currency", currency: "EUR" })}</td>
        </tr>`;
    }

    document.getElementById("risultato").innerText = montante.toLocaleString("it-IT", { style: "currency", currency: "EUR" });
    document.getElementById("interesse").innerText = interesseTotale.toLocaleString("it-IT", { style: "currency", currency: "EUR" });
    document.getElementById("capitale-iniziale").innerText = capitale.toLocaleString("it-IT", { style: "currency", currency: "EUR" });
    document.getElementById("dettagli-tabella").innerHTML = dettagli;
}

function cambiaTipo(tipo) {
    document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
    document.querySelector(`.tab:nth-child(${tipo === 'composto' ? 1 : tipo === 'semplice' ? 2 : 3})`).classList.add("active");
}
