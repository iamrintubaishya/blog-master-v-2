export default function PublicFooter() {
  return (
    <footer className="bg-subtle border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">BlogMaster</h3>
            <p className="text-secondary text-sm leading-relaxed">
              A platform for sharing knowledge and building community through thoughtful writing.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-primary mb-3">Categories</h4>
            <ul className="space-y-2 text-sm text-secondary">
              <li><a href="#" className="hover:text-primary transition-colors">Technology</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Design</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Productivity</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">AI & ML</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-primary mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-secondary">
              <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-primary mb-3">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-secondary hover:text-primary transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-secondary hover:text-primary transition-colors">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-secondary hover:text-primary transition-colors">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-sm text-secondary">&copy; 2024 BlogMaster. All rights reserved. <a href="/admin-login" className="text-xs opacity-30 hover:opacity-60 transition-opacity">•</a></p>
        </div>
      </div>
    </footer>
  );
}
