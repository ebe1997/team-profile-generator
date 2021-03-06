function template(data) {
  return `
<!DOCTYPE html>
<html>
<head>
<title>My Team</title>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
</head>
<body>
  <style>
      .ul{
          list-style-type:none;
          right: 0;
          position: relative;
      }
      li{
          float: left;
          margin: 20px;
      }
      .cardbody{
          width: 200px;
          border-radius: 10px;
          box-shadow: 5px 10px 8px #888888;
      }
  </style>
<div class="jumbotron" style="background: gray" >
  <h1 class="text-center" >My Team</h1>
  </div>
  <div class='container'>
  <ul class="ul">
  ${card(data)}
  </ul>
  </div>
</body>
</html>
`;
}
function card(data) {
  return data
    .map((x) => {
      let position = x.getRole();
      switch (position) {
        case "Manager":
          return makeManagerCard(x);
          break;
        case "Engineer":
          return makeEngineerCard(x);
          break;
        case "Intern":
          return makeInternCard(x);
          break;
      }
    })
    .join("\n");
}
function makeManagerCard(user) {
  let mangerCard = `
  <li>
  <div class="col-md-3">
  <div class="card cardbody">
    <div class="card-header" style="background: #5178ED">
                 ${user.name}<br>
                 <div class="fa fa-edit">${user.getRole()}</div>
                </div>
    <div class="card-body">
      <form role="form">			
        <div class="form-group">
            <label for="reserve-unique-id" id="reserve-unique-id">ID: ${
              user.id
            }</label>
        </div>
        <div class="form-group">
          <label for="reserve-email" id="reserve-email">Email: ${
            user.email
          }</label>
        </div>
        <div class="form-group">
            <label for="reserve-phone" id="reserve-office-number">Office Number: ${
              user.officeNumber
            }</label>					
        </div>				
        </form>
    </div>
  </div>
</div>
</li>
`;
  return mangerCard;
}
function makeEngineerCard(user) {
  let engineerCard = `
      <li>
      <div class="col-md-3">
                  <div class="card cardbody">
                    <div class="card-header" style="background: #5178ED">
                                 ${user.name}<br>
                                <div><i class="fa fa-book"></i> ${user.getRole()}</div><i class="">
                                </div>
                    <div class="card-body">
                      <form role="form">			
                        <div class="form-group">
                            <label for="reserve-unique-id" id="reserve-unique-id">ID:${
                              user.id
                            } </label>
                        </div>
                        <div class="form-group">
                          <label for="reserve-email" id="reserve-email">Email: ${
                            user.email
                          }</label>
                        </div>
                        <div class="form-group">
                            <label for="reserve-phone" id="github">Github: ${user.getGithub()}</label>					
                        </div>				
                        </form>
                    </div>
                  </div>
                </div>
                </li>
  `;
  return engineerCard;
}
function makeInternCard(user) {
  let internCard = `
  <li>
  <div class="col-md-3">
      <div class="card cardbody">
        <div class="card-header" style="background: #5178ED">
               ${user.name}<br>
              <div><i class="fa fa-coffee"></i> ${user.getRole()}</div>
              </div>
        <div class="card-body">
        <form role="form">			
          <div class="form-group">
            <label for="reserve-unique-id" id="reserve-unique-id">ID:${
              user.id
            } </label>
          </div>
          <div class="form-group">
          <label for="reserve-email" id="reserve-email">Email: ${
            user.email
          }</label>
          </div>
          <div class="form-group">
            <label for="reserve-phone" id="school">School: ${user.getSchool()}</label>					
          </div>				
          </form>
        </div>
      </div>
            </div>
            </li>
  `;
  return internCard;
}

module.exports = template;
