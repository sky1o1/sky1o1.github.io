window.onload = function () {
  const repo_list = document.getElementById("repo-list")
  let currentPageNumber = 1
  //load info
  loadInfo()

  // initial fetch 
  fetchRepoList()



  function loadInfo(){
    fetch("https://api.github.com/users/sky1o1")
    .then(response => response.json())
    .then(function (data) {
      let followerscount = data['followers'] 
      let followersInfo = `I have been followed by ${followerscount} awesome People on Github`

      document.getElementById('load').hidden = true 
      document.getElementById('mainContainer').hidden = false 
      document.getElementById('ProfileImage').src = data['avatar_url']
      document.getElementById('fullname').textContent = data['name']
      document.getElementById('bio').textContent = data['bio']
      document.getElementById('followersInformation').textContent = followersInfo
      document.getElementById('githublink').setAttribute("href",data['html_url'])
      document.getElementById('repoId').setAttribute("href",data['repos_url'])
      

    })
  }

  /**
   * next PageNumber Handler
   */
  function nextPageNumber() {
    currentPageNumber = currentPageNumber + 1 
    clearRepoList()
    fetchRepoList()
  }

  /**
   * Prev Page Number
   */
  function prevPageNumber(){
    currentPageNumber = currentPageNumber - 1 
    if(currentPageNumber !== 0){
      clearRepoList()
      fetchRepoList()
    }
  }

  /**
   * Next Btn click handler
   */
  document.getElementById('nextBtn').addEventListener('click',function(event){
    if(currentPageNumber < 3){
      nextPageNumber()
    }
  })

  /**
   * Prev Btn click handler
   */
  document.getElementById('prevBtn').addEventListener('click',function(event){
    if(currentPageNumber > 0){
      prevPageNumber()
    }
    
  })


/**
 * remove all child from repo_list
 */
  function clearRepoList(){
    repo_list.innerHTML = "";
  }

  function fetchRepoList(){
    fetch('https://api.github.com/users/sky1o1/repos?page='+ currentPageNumber +'&per_page=5')
    .then(response => response.json())
    .then(function (data) {
      data.forEach(element=>{
        repoCard(element['name'],element['html_url'])
      })
    })
  }

  function repoCard (repoName, repoURL) {
    const pElement = document.createElement('a')
    pElement.classList.add("repo-card")
    pElement.setAttribute("href",repoURL)
    pElement.innerText = repoName
    repo_list.append(pElement)
  }


}

