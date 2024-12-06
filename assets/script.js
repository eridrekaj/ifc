let months = ["January", "February", "March", "April", "May", "June", "Sol", "July", "August", "September", "October", "November",  "December"],
	daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function get13MonthDate() {
    
	let now = new Date(),
		totalDaysInYear = 364,
		currentYearDay = Math.floor((now - new Date(now.getFullYear(), 0, 1)) / (1000 * 60 * 60 * 24)) + 1,
		month = Math.ceil(currentYearDay / 28),
		day = ((currentYearDay - 1) % 28) + 1;
    
	return { month, day, currentDate: now };

}

function getSeason(month) {
    
	if (month >= 1 && month <= 3) return "Winter";
    if (month >= 4 && month <= 6) return "Spring";
    if (month === 7 || (month >= 8 && month <= 9)) return "Summer";
    if (month >= 10 && month <= 13) return "Autumn";
    
	return "Neutral";

}

function renderCalendar() {
    
	let { month: currentMonth, day: currentDay, currentDate } = get13MonthDate(),
		calendar = document.getElementById("calendar"),
		formattedDate = `${currentDay} ${months[currentMonth - 1]} ${currentDate.getFullYear()}`;
	
	calendar.innerHTML = "";

    document.title = `IFC, ${formattedDate}`;
    document.getElementById("date").innerText = formattedDate;

    months.forEach((monthName, monthIndex) => {
        
		let monthNumber = monthIndex + 1,
			season = getSeason(monthNumber),
			monthDiv = document.createElement("div"),
			isCurrentMonth = monthNumber === currentMonth,
			title = `${monthName} (${season})`,
			daysDiv = document.createElement("div");
        
		monthDiv.className = "month";
        monthDiv.innerHTML = `<h2>${title}</h2>`;
		
		daysDiv.className = "days";

        daysOfWeek.forEach(day => {
            
			let dayNameDiv = document.createElement("div");
            
			dayNameDiv.className = "day-name";
            dayNameDiv.textContent = day;
            daysDiv.appendChild(dayNameDiv);
        
		});

        for (let day = 1; day <= 28; day++) {
            
			let dayDiv = document.createElement("div");
            dayDiv.className = "day";
            
			if (isCurrentMonth && currentDay === day) {
                dayDiv.classList.add("today");
            }
            
			dayDiv.textContent = day;
            daysDiv.appendChild(dayDiv);
        
		}

        monthDiv.appendChild(daysDiv);
        calendar.appendChild(monthDiv);
    
	});

}

renderCalendar();