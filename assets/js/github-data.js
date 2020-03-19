window.addEventListener('load', function() {
    $.get({
        url: 'https://api.github.com/repos/turtlecoin/turtlecoin/issues',
        json: true,
        success: function(data) {
            const issues = document.getElementById('github-issues');

            if (issues === null) {
                console.log('Failed to get github-issues element.');
                return;
            }

            /* Clear 'loading' message */
            issues.innerHTML = '';

            for (var i = 0; i < 3; i++) {
                const l_issue = data.shift();
                const issue = {
                    url: l_issue.html_url,
                    title: l_issue.title,
                    author: l_issue.user.login,
                    timestamp: new Date(Date.parse(l_issue.created_at))
                }

                const listItem = document.createElement('li');
                const link = document.createElement('a');

                link.href = issue.url;
                link.innerText = issue.title;

                listItem.appendChild(link);
                issues.appendChild(listItem);
            }
        }
    })

    $.get({
        url: 'https://api.github.com/repos/turtlecoin/turtlecoin/commits',
        json: true,
        success: function(data) {
            const issues = document.getElementById('github-commits');

            if (issues === null) {
                console.log('Failed to get github-commits element.');
                return;
            }

            /* Clear 'loading' message */
            issues.innerHTML = '';

            data = data.filter(item => item.commit.message.indexOf('Merge') === -1);

            for (var i = 0; i < 3; i++) {
                const l_commit = data.shift();
                const commit = {
                    url: l_commit.html_url,
                    title: l_commit.commit.message,
                    author: l_commit.author.login,
                    timestamp: new Date(Date.parse(l_commit.commit.author.date))
                }

                const listItem = document.createElement('li');
                const link = document.createElement('a');

                link.href = commit.url;
                link.innerText = commit.title;

                listItem.appendChild(link);
                issues.appendChild(listItem);
            }
        }
    })

});
