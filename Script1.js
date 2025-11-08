let hourlyRate = 30;
let parkingData = JSON.parse(localStorage.getItem("parkingData")) || [];

function setHourlyRate() {
    const rate = document.getElementById("rateInput").value;
    if (rate) {
        hourlyRate = parseFloat(rate);
        alert(`Saatlik ücret ${hourlyRate}₺ olarak ayarlandı.`);
    }
}

function addVehicle() {
    const plate = document.getElementById("plateInput").value;
    if (!plate) return alert("Plaka giriniz.");
    const entryTime = new Date();
    parkingData.push({ plate, entryTime });
    localStorage.setItem("parkingData", JSON.stringify(parkingData));
    alert(`${plate} plakalı araç giriş yaptı.`);
    listVehicles();
}

function removeVehicle() {
    const plate = document.getElementById("plateInput").value;
    const index = parkingData.findIndex(v => v.plate === plate);
    if (index === -1) return alert("Araç bulunamadı.");
    const now = new Date();
    const entryTime = new Date(parkingData[index].entryTime);
    const hours = Math.ceil((now - entryTime) / (1000 * 60 * 60));
    const fee = hours * hourlyRate;
    parkingData.splice(index, 1);
    localStorage.setItem("parkingData", JSON.stringify(parkingData));
    alert(`${plate} plakalı araç çıkış yaptı.\nSüre: ${hours} saat\nÜcret: ${fee}₺`);
    listVehicles();
}

function listVehicles() {
    const container = document.getElementById("vehicleList");
    container.innerHTML = "";
    parkingData.forEach(v => {
        const div = document.createElement("div");
        div.className = "parking-spot";
        div.innerHTML = `<strong>${v.plate}</strong><br>Giriş: ${new Date(v.entryTime).toLocaleString()}`;
        container.appendChild(div);
    });
}

function generateReport() {
    let report = "📄 Günlük Otopark Raporu\n\n";
    parkingData.forEach(v => {
        report += `Plaka: ${v.plate}, Giriş: ${new Date(v.entryTime).toLocaleString()}\n`;
    });

    const blob = new Blob([report], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "otopark_raporu.txt";
    link.click();
}