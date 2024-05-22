$(document).ready(function(){
    getChart();
});

function getChart(){
    const ctx = document.getElementById('myChart').getContext('2d');
    fetch('http://localhost:8080/api/v1/reports/revenue', {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if (data){
            const myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Tổng tiền thuê xe', 'Tổng tiền trả xe', 'Tổng tiền bảo trì', 'Tổng tiền bảo hiểm', 'Lợi nhuận'],
                    datasets: [{
                        label: 'Doanh thu (VND), Vốn: 10.000.000 VND',
                        data: [data.tien_thue_goc, data.tien_tra_xe, data.tien_bao_tri, data.tien_bao_hiem, data.loi_nhuan],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }else{
            alert("oke");
        }
    })
    .catch(err => console.log(err));
}