'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
}

const GithubRepos = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRepos, setFilteredRepos] = useState<Repo[]>([]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/ronoc2020/repos');
        const data = await response.json();
        setRepos(data);
        setFilteredRepos(data);
      } catch (error) {
        console.error('Error fetching repos:', error);
      }
    };

    fetchRepos();
  }, []);

  useEffect(() => {
    const filtered = repos.filter(repo =>
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredRepos(filtered);
  }, [searchTerm, repos]);

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">GitHub Repositories</h2>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search repositories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRepos.map((repo) => (
          <Card key={repo.id} className="card-hover">
            <CardHeader>
              <CardTitle>{repo.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">{repo.description || 'No description available'}</p>
              <Button asChild>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">View on GitHub</a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GithubRepos;