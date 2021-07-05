gitlab_rails['omniauth_providers'] = [
    {
      "name" => "auth0",
      "args" => { client_id: '1cVaIzVQYyw3mxvwiRLJavF5h4795ZLG',
                  client_secret: 'HPM2ekyc2dZiRGxuPnNZFNhQfvlqi3I9tmTUgNjwTSlfrQkU4roJJBEq_2uycxS8',
                  domain: 'dev-n170-nlt.us.auth0.com',
                  scope: 'openid profile email'
                }
    }
  ]

 useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://gitlab.com/api/v4/users?username=rithikagarwal2');
     
      console.log(res);
      setuserid(res.data[0].id);
      console.log(res.data[0].id);
      const projects= await axios.get(`https://gitlab.com/api/v4/users/${res.data[0].id}/projects?access_token=a47babe4ca273839ce99dc4e4a568ec343a17b3ca830128699c32b0f4e1c5555`);

      console.log(projects);
      var arr =[];
      projects.data.map((obj)=>{
        arr.push(obj.id);
      })
      setPosts(arr);
      setLoading(false);
      console.log(arr);
    };

    fetchPosts();
  }, []);