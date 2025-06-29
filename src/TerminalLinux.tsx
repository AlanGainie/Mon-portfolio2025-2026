import React, { useState } from 'react';
import { ReactTerminal } from 'react-terminal';

const TerminalLinux = () => {
    const [fs, setFs] = useState({
        '/': {
            type: 'dir',
            content: {
                home: {
                    type: 'dir',
                    content: {
                        'readme.txt': {
                            type: 'file',
                            content: 'Bienvenue dans mon terminal personnalisé !',
                        },
                    },
                },
                var: {
                    type: 'dir',
                    content: {},
                },
            },
        },
    });

    const [currentPath, setCurrentPath] = useState('/home');

    const getNode = (path: string) => {
        if (!path.startsWith('/')) path = currentPath + '/' + path;
        const parts = path.split('/').filter(Boolean);
        let node = fs['/'];
        for (const part of parts) {
            if (node.type !== 'dir' || !node.content[part]) return null;
            node = node.content[part];
        }
        return node;
    };

    const resolvePath = (inputPath: string) => {
        const parts = inputPath.split('/');
        let stack = currentPath === '/' ? [''] : currentPath.split('/').filter(Boolean);
        if (inputPath.startsWith('/')) stack = [''];
        for (const part of parts) {
            if (part === '' || part === '.') continue;
            else if (part === '..') stack.pop();
            else stack.push(part);
        }
        return stack.length === 1 && stack[0] === '' ? '/' : '/' + stack.join('/');
    };

    const commands = {
        help: () =>
            `Commandes disponibles : help, about, contact, ls, cd, cat, touch, mkdir, rmdir, rm, pwd, clear`,

        about: () => `Terminal Portfolio — développé par Alan Gainié`,

        contact: () => window.open('mailto:alan.gainie@gmail.com', '_blank'),

        pwd: () => currentPath,

        ls: (args: string[]) => {
            const path = args[0] ? resolvePath(args[0]) : currentPath;
            const node = getNode(path);
            if (!node) return `ls: impossible d'accéder à '${path}': Aucun fichier ou dossier de ce type`;
            if (node.type !== 'dir') return path.split('/').filter(Boolean).pop() || path;
            return Object.keys(node.content).join('  ');
        },

        cd: (args: string[]) => {
            if (!args[0]) {
                setCurrentPath('/home');
                return '';
            }
            const path = resolvePath(args[0]);
            const node = getNode(path);
            if (!node) return `cd: ${args[0]}: Aucun fichier ou dossier de ce type`;
            if (node.type !== 'dir') return `cd: ${args[0]}: Ce n'est pas un dossier`;
            setCurrentPath(path);
            return '';
        },

        cat: (args: string[]) => {
            if (!args[0]) return 'cat: Fichier non spécifié';
            const path = resolvePath(args[0]);
            const node = getNode(path);
            if (!node) return `cat: ${args[0]}: Aucun fichier ou dossier de ce type`;
            if (node.type !== 'file') return `cat: ${args[0]}: Ce n'est pas un fichier`;
            return node.content;
        },

        touch: (args: string[]) => {
            if (!args[0]) return 'touch: Fichier non spécifié';
            const path = resolvePath(args[0]);
            const parts = path.split('/').filter(Boolean);
            const fileName = parts.pop();
            if (!fileName) return 'touch: nom de fichier invalide';
            const dirPath = parts.length === 0 ? '/' : '/' + parts.join('/');
            const dirNode = getNode(dirPath);
            if (!dirNode) return `touch: impossible de créer '${args[0]}': Aucun dossier parent`;
            if (dirNode.type !== 'dir') return `touch: impossible de créer '${args[0]}': Parent n'est pas un dossier`;
            if (dirNode.content[fileName]) {
                // fichier existe déjà, rien à faire
                return '';
            }
            // création fichier vide
            const newFs = { ...fs };
            let node = newFs['/'];
            const keys = dirPath.split('/').filter(Boolean);
            for (const key of keys) {
                if (!node.content[key]) return `touch: erreur interne`;
                node = node.content[key];
            }
            node.content[fileName] = { type: 'file', content: '' };
            setFs(newFs);
            return '';
        },

        mkdir: (args: string[]) => {
            if (!args[0]) return 'mkdir: Dossier non spécifié';
            const path = resolvePath(args[0]);
            const parts = path.split('/').filter(Boolean);
            const dirName = parts.pop();
            if (!dirName) return 'mkdir: nom de dossier invalide';
            const parentPath = parts.length === 0 ? '/' : '/' + parts.join('/');
            const parentNode = getNode(parentPath);
            if (!parentNode) return `mkdir: impossible de créer le dossier '${args[0]}': Aucun dossier parent`;
            if (parentNode.type !== 'dir') return `mkdir: impossible de créer le dossier '${args[0]}': Parent n'est pas un dossier`;
            if (parentNode.content[dirName]) return `mkdir: impossible de créer le dossier '${args[0]}': Existe déjà`;
            const newFs = { ...fs };
            let node = newFs['/'];
            const keys = parentPath.split('/').filter(Boolean);
            for (const key of keys) {
                if (!node.content[key]) return `mkdir: erreur interne`;
                node = node.content[key];
            }
            node.content[dirName] = { type: 'dir', content: {} };
            setFs(newFs);
            return '';
        },

        rmdir: (args: string[]) => {
            if (!args[0]) return 'rmdir: Dossier non spécifié';
            const path = resolvePath(args[0]);
            const parts = path.split('/').filter(Boolean);
            const dirName = parts.pop();
            if (!dirName) return 'rmdir: nom de dossier invalide';
            const parentPath = parts.length === 0 ? '/' : '/' + parts.join('/');
            const parentNode = getNode(parentPath);
            if (!parentNode) return `rmdir: impossible de supprimer '${args[0]}': Aucun dossier parent`;
            if (parentNode.type !== 'dir') return `rmdir: impossible de supprimer '${args[0]}': Parent n'est pas un dossier`;
            if (!parentNode.content[dirName]) return `rmdir: impossible de supprimer '${args[0]}': N'existe pas`;
            if (parentNode.content[dirName].type !== 'dir') return `rmdir: impossible de supprimer '${args[0]}': Ce n'est pas un dossier`;
            if (Object.keys(parentNode.content[dirName].content).length > 0) return `rmdir: impossible de supprimer '${args[0]}': Dossier non vide`;
            const newFs = { ...fs };
            let node = newFs['/'];
            const keys = parentPath.split('/').filter(Boolean);
            for (const key of keys) {
                if (!node.content[key]) return `rmdir: erreur interne`;
                node = node.content[key];
            }
            delete node.content[dirName];
            setFs(newFs);
            return '';
        },

        rm: (args: string[]) => {
            if (!args[0]) return 'rm: Fichier non spécifié';
            const path = resolvePath(args[0]);
            const parts = path.split('/').filter(Boolean);
            const fileName = parts.pop();
            if (!fileName) return 'rm: nom de fichier invalide';
            const parentPath = parts.length === 0 ? '/' : '/' + parts.join('/');
            const parentNode = getNode(parentPath);
            if (!parentNode) return `rm: impossible de supprimer '${args[0]}': Aucun dossier parent`;
            if (parentNode.type !== 'dir') return `rm: impossible de supprimer '${args[0]}': Parent n'est pas un dossier`;
            if (!parentNode.content[fileName]) return `rm: impossible de supprimer '${args[0]}': N'existe pas`;
            if (parentNode.content[fileName].type !== 'file') return `rm: impossible de supprimer '${args[0]}': Ce n'est pas un fichier`;
            const newFs = { ...fs };
            let node = newFs['/'];
            const keys = parentPath.split('/').filter(Boolean);
            for (const key of keys) {
                if (!node.content[key]) return `rm: erreur interne`;
                node = node.content[key];
            }
            delete node.content[fileName];
            setFs(newFs);
            return '';
        },

        clear: () => '',
    };

    return (
        <div className="bg-black text-green-400 font-mono p-4 rounded-xl shadow-xl w-[640px] h-[432px] overflow-y-auto text-sm leading-[18px]">
            <ReactTerminal
                commands={commands}
                welcomeMessage={'Bienvenue sur mon terminal Fedora !\nTapez "help" pour les commandes.'}
                prompt={`alan@portfolio:${currentPath}$`}
                theme={{
                    background: '#000000',
                    promptSymbolColor: '#33FF33',
                    commandColor: '#00FF00',
                    outputColor: '#00FF00',
                    errorOutputColor: '#FF3333',
                    fontSize: '14px',
                }}
                showControlBar={false}
                allowTabs={false}
            />
        </div>
    );
};

export default TerminalLinux;
