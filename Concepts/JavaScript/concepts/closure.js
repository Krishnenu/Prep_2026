function issueTicket() {
  let availableTicket = 2;
  return function issued() {
    if (availableTicket > 0) {
      availableTicket = availableTicket - 1;
      console.log("ticket issued");
    } else {
      console.log("no booking allowed");
    }
  };
}

const getTicket = issueTicket();

// getTicket();
// getTicket();
// getTicket();

let issueTicket = () => {
  let availableTicket = 2;
  return () => {
    if (availableTicket > 0) {
      availableTicket = availableTicket - 1;
      console.log("ticket issued");
    } else {
      console.log("no booking allowed");
    }
  };
};
